import { AutoMap } from '@automapper/classes';
import {
  buildSchema,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
})
export class BaseModel {
  @prop()
  @AutoMap()
  createdAt!: Date;
  @prop()
  @AutoMap()
  updatedAt!: Date;
  @prop({ default: true })
  @AutoMap()
  active!: boolean;
  @AutoMap()
  id!: string;

  static get feature() {
    return {
      name: this.name,
      schema: buildSchema(this),
    };
  }
}
