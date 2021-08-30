import { BaseModel } from '@nx-mess/chat-api/shared/data-access';
import { useMongoosePlugins } from '@nx-mess/chat-api/shared/utils';
import { prop } from '@typegoose/typegoose';

@useMongoosePlugins()
export class User extends BaseModel {
  @prop()
  username!: string;
  @prop()
  userId!: string;
  @prop({ required: false })
  name?: string;
  @prop({ required: false })
  givenName?: string;
  @prop({ required: false })
  familyName?: string;
  @prop({ required: false })
  nickname?: string;
  @prop({ required: false })
  email?: string;
  @prop({ default: false })
  emailVerified!: boolean;
  @prop({ required: false })
  phoneNumber?: string;
  @prop({ required: false })
  phoneVerified?: boolean;
  @prop({ required: false })
  picture?: string;
}
