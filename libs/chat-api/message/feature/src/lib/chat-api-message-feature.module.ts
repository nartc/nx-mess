import { Module } from '@nestjs/common';
import { ChatApiMessageDataAccessModule } from '@nx-mess/chat-api/message/data-access';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [ChatApiMessageDataAccessModule],
  controllers: [],
  providers: [MessageGateway],
})
export class ChatApiMessageFeatureModule {}
