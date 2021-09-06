import { Module } from '@nestjs/common';
import { ChatApiMessageDataAccessModule } from '@nx-mess/chat-api/message/data-access';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [ChatApiMessageDataAccessModule],
  providers: [MessageGateway],
})
export class ChatApiMessageFeatureModule {}
