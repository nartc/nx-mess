import { AutoMap } from '@automapper/classes';
import {
  BaseModel,
  MessageReactionType,
} from '@nx-mess/chat-api/data-access-shared';
import { User } from '@nx-mess/chat-api/data-access-user';
import { useMongoosePlugins } from '@nx-mess/chat-api/utils-shared';
import { prop, Ref } from '@typegoose/typegoose';
import { MessageAttachment } from './message-attachment.model';

@useMongoosePlugins()
export class Message extends BaseModel {
  @prop({ required: true })
  @AutoMap()
  text!: string;
  @prop({ ref: () => User, required: true })
  @AutoMap({ typeFn: () => User })
  sender!: Ref<User>;
  @prop({ ref: () => User })
  @AutoMap({ typeFn: () => User })
  receiver?: Ref<User>;
  @prop({ type: () => MessageAttachment })
  @AutoMap({ typeFn: () => MessageAttachment })
  attachment?: MessageAttachment;
  @prop({ type: () => String, default: {} })
  reactions!: Map<string, MessageReactionType>;
}
