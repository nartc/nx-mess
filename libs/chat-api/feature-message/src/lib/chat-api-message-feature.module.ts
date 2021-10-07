import { Module } from '@nestjs/common';
import { ChatApiMessageDataAccessModule } from '@nx-mess/chat-api/data-access-message';
import { MessageProfile } from '@nx-mess/chat-api/mappings-shared';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';

@Module({
  controllers: [MessageController],
  imports: [ChatApiMessageDataAccessModule],
  providers: [MessageGateway, MessageProfile],
})
export class ChatApiMessageFeatureModule {}
