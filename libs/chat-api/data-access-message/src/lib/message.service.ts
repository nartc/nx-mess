import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BaseService,
  CreateGeneralMessageDto,
  MessageDto,
  ModelType,
} from '@nx-mess/chat-api/data-access-shared';
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

  async createGeneralMessage(
    dto: CreateGeneralMessageDto,
    senderId: string
  ): Promise<MessageDto> {
    const newMessage = this.createModel({
      text: dto.message,
      sender: this.toObjectId(senderId),
    });

    await this.create(newMessage);

    const message = await this.findById(newMessage.id).exec() as Message;

    if (!message) {
      throw new NotFoundException('No message found');
    }

    return this.mapper.map(message, MessageDto, Message);
  }
}
