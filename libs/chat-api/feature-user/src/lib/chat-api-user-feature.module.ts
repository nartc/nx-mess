import { Module } from '@nestjs/common';
import { ChatApiUserDataAccessModule } from '@nx-mess/chat-api/data-access-user';
import { UserProfile } from '@nx-mess/chat-api/mappings-shared';
import { UserController } from './user.controller';
import { UserGateway } from './user.gateway';

@Module({
  imports: [ChatApiUserDataAccessModule],
  controllers: [UserController],
  providers: [UserProfile, UserGateway],
})
export class ChatApiUserFeatureModule {}
