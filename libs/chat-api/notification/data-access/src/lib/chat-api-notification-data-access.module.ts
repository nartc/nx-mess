import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification } from './notification.model';
import { NotificationService } from './notification.service';

@Module({
  imports: [MongooseModule.forFeature([Notification.feature])],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class ChatApiNotificationDataAccessModule {}
