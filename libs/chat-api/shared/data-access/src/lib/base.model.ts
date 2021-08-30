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
  createdAt!: Date;
  @prop()
  updatedAt!: Date;
  @prop({ default: true })
  active!: boolean;
  id!: string;

  static get feature() {
    return {
      name: this.name,
      schema: buildSchema(this),
    };
  }
}
