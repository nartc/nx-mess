import { Module } from '@nestjs/common';
import { ChatApiMessageDataAccessModule } from '@nx-mess/chat-api/data-access-message';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [ChatApiMessageDataAccessModule],
  providers: [MessageGateway],
})
export class ChatApiMessageFeatureModule {}
