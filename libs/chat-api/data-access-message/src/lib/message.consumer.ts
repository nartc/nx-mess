import { Process, Processor } from '@nestjs/bull';
import { CREATE_GENERAL_MESSAGE } from '@nx-mess/chat-api/utils-message';
import { MESSAGE_QUEUE } from '@nx-mess/chat-api/utils-shared';
import { CreateGeneralMessageDto } from '@nx-mess/shared/data-access-dtos';
import { Job } from 'bull';
import { MessageService } from './message.service';

@Processor(MESSAGE_QUEUE)
export class MessageConsumer {
  constructor(private messageService: MessageService) {}

  @Process(CREATE_GENERAL_MESSAGE)
  async createGeneralMessage(job: Job<CreateGeneralMessageDto>) {
    const message = await this.messageService.createGeneralMessage(job.data);
    return message.id;
  }
}
