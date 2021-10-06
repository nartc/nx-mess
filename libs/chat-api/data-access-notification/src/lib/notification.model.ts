import { AutoMap } from '@automapper/classes';
import { BaseModel } from '@nx-mess/chat-api/shared-data-access';
import { useMongoosePlugins } from '@nx-mess/chat-api/shared-utils';
import { User } from '@nx-mess/chat-api/data-access-user';
import { prop, Ref } from '@typegoose/typegoose';

@useMongoosePlugins()
export class Notification extends BaseModel {
  @prop({ ref: () => User })
  @AutoMap({ typeFn: () => User })
  actor!: Ref<User>;
  @prop({ default: false })
  @AutoMap()
  isRead!: boolean;
}
