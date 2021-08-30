import { Module } from '@nestjs/common';
import { ChatApiUserDataAccessModule } from '@nx-mess/chat-api/user/data-access';
import { UserController } from './user.controller';

@Module({
  imports: [ChatApiUserDataAccessModule],
  controllers: [UserController],
})
export class ChatApiUserFeatureModule {}
