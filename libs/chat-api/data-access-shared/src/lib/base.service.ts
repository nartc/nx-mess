import { InternalServerErrorException } from '@nestjs/common';
import type { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import type { MongoError } from 'mongodb';
import {
  EnforceDocument,
  FilterQuery,
  QueryOptions as MongooseQueryOptions,
  QueryWithHelpers,
  Types,
  UpdateQuery,
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
export type QueryItem<TModel extends BaseModel> = QueryWithHelpers<
  EnforceDocumentType<TModel>,
  EnforceDocumentType<TModel>
>;

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

  createModel(doc?: Partial<TModel>) {
    return new this.model(doc) as TModel;
  }

  findAll(options?: QueryOptions) {
    return this.model
      .find()
      .setOptions(BaseService.getQueryOptions(options)) as QueryList<TModel>;
  }

  findOne(options?: QueryOptions) {
    return this.model
      .findOne()
      .setOptions(BaseService.getQueryOptions(options)) as QueryItem<TModel>;
  }

  findById(id: string, options?: QueryOptions) {
    return this.model
      .findById(this.toObjectId(id))
      .setOptions(BaseService.getQueryOptions(options)) as QueryItem<TModel>;
  }

  async create(item: TModel) {
    try {
      return (await this.model.create(item)) as DocumentType<TModel>;
    } catch (e) {
      BaseService.throwMongoError(e);
    }
    return;
  }

  deleteOne(options?: QueryOptions) {
    return this.model
      .findOneAndDelete()
      .setOptions(BaseService.getQueryOptions(options)) as QueryItem<TModel>;
  }

  deleteById(id: string, options?: QueryOptions) {
    return this.model
      .findByIdAndDelete(new Types.ObjectId(id))
      .setOptions(BaseService.getQueryOptions(options)) as QueryItem<TModel>;
  }

  updateById(
    id: string,
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    updateOptions: MongooseQueryOptions & { multi?: boolean } = {},
    options?: QueryOptions
  ) {
    return this.updateByFilter(
      { _id: new Types.ObjectId(id) } as FilterQuery<DocumentType<TModel>>,
      updateQuery,
      updateOptions,
      options
    ) as QueryItem<TModel>;
  }

  updateByFilter(
    filter: FilterQuery<DocumentType<TModel>> = {},
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    updateOptions: MongooseQueryOptions = {},
    options?: QueryOptions
  ) {
    return this.model
      .findOneAndUpdate(filter, updateQuery, {
        ...Object.assign({ omitUndefined: true }, updateOptions),
        new: true,
      })
      .setOptions(
        BaseService.getQueryOptions(options)
      ) as unknown as QueryItem<TModel>;
  }

  count(filter: FilterQuery<DocumentType<TModel>> = {}) {
    return this.model.count(filter) as QueryWithHelpers<
      number,
      EnforceDocumentType<TModel>
    >;
  }

  async countAsync(filter: FilterQuery<DocumentType<TModel>> = {}) {
    try {
      return (await this.count(filter).exec()) as number;
    } catch (e) {
      BaseService.throwMongoError(e);
    }
    return;
  }

  async exists(filter: FilterQuery<DocumentType<TModel>> = {}) {
    try {
      return (await this.model.exists(filter)) as boolean;
    } catch (e) {
      BaseService.throwMongoError(e);
    }
    return;
  }
}
