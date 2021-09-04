import { Module } from '@nestjs/common';
import { ChatApiMessageDataAccessModule } from '@nx-mess/chat-api/message/data-access';
import { ChatApiUserDataAccessModule } from '@nx-mess/chat-api/user/data-access';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [ChatApiMessageDataAccessModule, ChatApiUserDataAccessModule],
  providers: [MessageGateway],
})
export class ChatApiMessageFeatureModule {}
