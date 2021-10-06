import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService, ModelType } from '@nx-mess/chat-api/shared-data-access';
import { Notification } from './notification.model';

@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(
    @InjectModel(Notification.name) notificationModel: ModelType<Notification>
  ) {
    super(notificationModel);
  }
}
