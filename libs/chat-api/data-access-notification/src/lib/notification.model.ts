import { AutoMap } from '@automapper/classes';
import { BaseModel } from '@nx-mess/chat-api/data-access-shared';
import { User } from '@nx-mess/chat-api/data-access-user';
import { useMongoosePlugins } from '@nx-mess/chat-api/utils-shared';
import { prop, Ref } from '@typegoose/typegoose';

@useMongoosePlugins()
export class Notification extends BaseModel {
  @prop({ ref: () => User })
  @AutoMap({ typeFn: () => User })
  actor!: Ref<User>;
  @prop({ ref: () => User })
  @AutoMap({ typeFn: () => User })
  receiver!: Ref<User>;
  @prop({ default: false })
  @AutoMap()
  isRead!: boolean;
}
