import { AutoMap } from '@automapper/classes';
import { prop } from '@typegoose/typegoose';

export class MessageAttachment {
  @prop()
  @AutoMap()
  thumbnail!: string;
  @prop()
  @AutoMap()
  original!: string;
}
