import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BaseService,
  ModelType,
  NotificationDto,
} from '@nx-mess/chat-api/data-access-shared';
import { Notification } from './notification.model';

@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(
    @InjectModel(Notification.name) notificationModel: ModelType<Notification>,
    @InjectMapper() private mapper: Mapper
  ) {
    super(notificationModel);
  }

  async createNotification(actorId: string): Promise<Notification> {
    const newNotification = this.createModel({
      actor: this.toObjectId(actorId),
    });

    return (await this.create(newNotification)) as Notification;
  }

  async getAllNotifications(currentUserId: string): Promise<NotificationDto[]> {
    const notifications: Notification[] = await this.findAll()
      .where('receiver')
      .equals(this.toObjectId(currentUserId))
      .exec();
    return this.mapper.mapArray(notifications, NotificationDto, Notification);
  }
}
