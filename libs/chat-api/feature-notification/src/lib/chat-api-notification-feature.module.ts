import { Module } from '@nestjs/common';
import { ChatApiNotificationDataAccessModule } from '@nx-mess/chat-api/data-access-notification';
import { NotificationController } from './notification.controller';

@Module({
  imports: [ChatApiNotificationDataAccessModule],
  controllers: [NotificationController],
  exports: [],
})
export class ChatApiNotificationFeatureModule {}
