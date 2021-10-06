import { Module } from '@nestjs/common';
import { UserProfile } from '@nx-mess/chat-api/shared-mappings';
import { ChatApiUserDataAccessModule } from '@nx-mess/chat-api/data-access-user';
import { UserController } from './user.controller';

@Module({
  imports: [ChatApiUserDataAccessModule],
  controllers: [UserController],
  providers: [UserProfile],
})
export class ChatApiUserFeatureModule {}
