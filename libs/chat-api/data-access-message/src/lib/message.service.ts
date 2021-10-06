import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService, ModelType } from '@nx-mess/chat-api/shared/data-access';
import { Message } from './message.model';

@Injectable()
export class MessageService extends BaseService<Message> {
  constructor(@InjectModel(Message.name) messageModel: ModelType<Message>) {
    super(messageModel);
  }
}
