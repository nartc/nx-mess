import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BaseService,
  MessageDto,
  ModelType,
} from '@nx-mess/chat-api/data-access-shared';
import { CreateGeneralMessageDto } from '@nx-mess/shared/data-access-dtos';
import { Message } from './message.model';

@Injectable()
export class MessageService extends BaseService<Message> {
  constructor(
    @InjectModel(Message.name) messageModel: ModelType<Message>,
    @InjectMapper() private mapper: Mapper
  ) {
    super(messageModel);
  }

  async getAllMessages(): Promise<MessageDto[]> {
    const messages: Message[] = await this.findAll().exec();
    return this.mapper.mapArray(messages, MessageDto, Message);
  }

  async createGeneralMessage(dto: CreateGeneralMessageDto): Promise<Message> {
    const newMessage = this.createModel({
      text: dto.message,
      sender: this.toObjectId(dto.senderId),
    });

    return (await this.create(newMessage)) as Message;
  }
}
