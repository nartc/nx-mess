import { BaseModel } from '@nx-mess/chat-api/shared/data-access';
import { useMongoosePlugins } from '@nx-mess/chat-api/shared/utils';
import { User } from '@nx-mess/chat-api/user/data-access';
import { prop, Ref } from '@typegoose/typegoose';
import { MessageAttachment } from './message-attachment.model';

@useMongoosePlugins()
export class Message extends BaseModel {
  @prop({ required: true })
  text!: string;
  @prop({ ref: () => User })
  sender?: Ref<User>;
  @prop()
  channel?: string;
  @prop({ ref: () => User })
  receiver?: Ref<User>;
  @prop()
  attachment?: MessageAttachment;
}
