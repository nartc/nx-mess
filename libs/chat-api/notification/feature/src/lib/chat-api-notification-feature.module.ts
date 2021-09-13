import { Module } from '@nestjs/common';
import { ChatApiNotificationDataAccessModule } from '@nx-mess/chat-api/notification/data-access';

@Module({
  imports: [ChatApiNotificationDataAccessModule],
  providers: [],
  exports: [],
})
export class ChatApiNotificationFeatureModule {}
