import { InternalServerErrorException } from '@nestjs/common';
import type { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import type { MongoError } from 'mongodb';
import {
  EnforceDocument,
  FilterQuery,
  QueryOptions as MongooseQueryOptions,
  QueryWithHelpers,
  Types,
  UpdateQuery
} from 'mongoose';
import { BaseModel } from './base.model';

interface QueryOptions {
  lean?: boolean;
  autopopulate?: boolean;
}

export type EnforceDocumentType<TModel extends BaseModel> = EnforceDocument<
  DocumentType<TModel>,
  Record<string, unknown>,
  Record<string, unknown>
>;

export type QueryList<TModel extends BaseModel> = QueryWithHelpers<
  Array<EnforceDocumentType<TModel>>,
  EnforceDocumentType<TModel>
>;
export type QueryItem<
  TModel extends BaseModel,
  TReturnType = EnforceDocumentType<TModel> | null
> = QueryWithHelpers<TReturnType, EnforceDocumentType<TModel>>;

export type ModelType<TModel extends BaseModel> = ReturnModelType<
  new (...args: unknown[]) => TModel
>;

export abstract class BaseService<TModel extends BaseModel> {
  protected constructor(protected model: ModelType<TModel>) {}

  private static get defaultOptions(): QueryOptions {
    return { lean: true, autopopulate: true };
  }

  private static getQueryOptions(options?: QueryOptions) {
    const mergedOptions = {
      ...BaseService.defaultOptions,
      ...(options || {}),
    };
    const option: { virtuals: boolean; autopopulate?: boolean } | null =
      mergedOptions.lean ? { virtuals: true } : null;

    if (option && mergedOptions.autopopulate) {
      option['autopopulate'] = true;
    }

    return { lean: option, autopopulate: mergedOptions.autopopulate };
  }

  protected static throwMongoError(err: MongoError): void {
    throw new InternalServerErrorException(err, err.errmsg);
  }

  protected toObjectId(id: string) {
    return new Types.ObjectId(id);
  }

  createModel(doc?: Partial<TModel>): TModel {
    return new this.model(doc);
  }

  findAll(options?: QueryOptions): QueryList<TModel> {
    return this.model.find().setOptions(BaseService.getQueryOptions(options));
  }

  findOne(options?: QueryOptions): QueryItem<TModel> {
    return this.model
      .findOne()
      .setOptions(BaseService.getQueryOptions(options));
  }

  findById(id: string, options?: QueryOptions): QueryItem<TModel> {
    return this.model
      .findById(this.toObjectId(id))
      .setOptions(BaseService.getQueryOptions(options));
  }

  async create(item: TModel): Promise<DocumentType<TModel> | null> {
    try {
      return await this.model.create(item);
    } catch (e) {
      BaseService.throwMongoError(e);
    }
    return null;
  }

  deleteOne(options?: QueryOptions): QueryItem<TModel> {
    return this.model
      .findOneAndDelete()
      .setOptions(BaseService.getQueryOptions(options));
  }

  deleteById(id: string, options?: QueryOptions): QueryItem<TModel> {
    return this.model
      .findByIdAndDelete(this.toObjectId(id))
      .setOptions(BaseService.getQueryOptions(options));
  }

  update(item: TModel, options?: QueryOptions): QueryItem<TModel> {
    return this.model
      .findByIdAndUpdate(
        this.toObjectId(item.id),
        { $set: item } as UpdateQuery<DocumentType<TModel>>,
        { upsert: true, new: true }
      )
      .setOptions(BaseService.getQueryOptions(options));
  }

  updateById(
    id: string,
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    updateOptions: MongooseQueryOptions & { multi?: boolean } = {},
    options?: QueryOptions
  ): QueryItem<TModel> {
    return this.updateByFilter(
      { _id: this.toObjectId(id) } as FilterQuery<DocumentType<TModel>>,
      updateQuery,
      updateOptions,
      options
    );
  }

  updateByFilter(
    filter: FilterQuery<DocumentType<TModel>> = {},
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    updateOptions: Omit<MongooseQueryOptions, 'new'> = {},
    options?: QueryOptions
  ): QueryItem<TModel> {
    return this.model
      .findOneAndUpdate(
        filter,
        updateQuery,
        Object.assign({ new: true }, updateOptions)
      )
      .setOptions(BaseService.getQueryOptions(options));
  }

  count(
    filter: FilterQuery<DocumentType<TModel>> = {}
  ): QueryItem<TModel, number> {
    return this.model.count(filter);
  }

  async countAsync(
    filter: FilterQuery<DocumentType<TModel>> = {}
  ): Promise<number> {
    try {
      return await this.count(filter).exec();
    } catch (e) {
      BaseService.throwMongoError(e);
    }
    return 0;
  }

  async exists(
    filter: FilterQuery<DocumentType<TModel>> = {}
  ): Promise<boolean> {
    try {
      return await this.model.exists(filter);
    } catch (e) {
      BaseService.throwMongoError(e);
    }
    return false;
  }
}
