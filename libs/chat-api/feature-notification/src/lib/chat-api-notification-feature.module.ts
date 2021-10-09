import { Module } from '@nestjs/common';
import { ChatApiNotificationDataAccessModule } from '@nx-mess/chat-api/data-access-notification';
import { NotificationProfile } from '@nx-mess/chat-api/mappings-shared';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [ChatApiNotificationDataAccessModule],
  controllers: [NotificationController],
  providers: [NotificationGateway, NotificationProfile],
})
export class ChatApiNotificationFeatureModule {}
