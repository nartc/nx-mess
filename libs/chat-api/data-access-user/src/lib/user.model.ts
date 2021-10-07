import { AutoMap } from '@automapper/classes';
import { BaseModel } from '@nx-mess/chat-api/data-access-shared';
import { useMongoosePlugins } from '@nx-mess/chat-api/utils-shared';
import { prop } from '@typegoose/typegoose';

@useMongoosePlugins()
export class User extends BaseModel {
  @prop()
  @AutoMap()
  username!: string;
  @prop()
  @AutoMap()
  userId!: string;
  @prop({ required: false })
  @AutoMap()
  name?: string;
  @prop({ required: false })
  @AutoMap()
  givenName?: string;
  @prop({ required: false })
  @AutoMap()
  familyName?: string;
  @prop({ required: false })
  @AutoMap()
  nickname?: string;
  @prop({ required: false })
  @AutoMap()
  email?: string;
  @prop({ default: false })
  @AutoMap()
  emailVerified!: boolean;
  @prop({ required: false })
  @AutoMap()
  phoneNumber?: string;
  @prop({ required: false })
  @AutoMap()
  phoneVerified?: boolean;
  @prop({ required: false })
  @AutoMap()
  picture?: string;
}
