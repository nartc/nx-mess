import { prop } from '@typegoose/typegoose';

export class MessageAttachment {
  @prop()
  thumbnail!: string;
  @prop()
  original!: string;
}
