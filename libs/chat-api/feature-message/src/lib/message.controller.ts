import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessageService } from '@nx-mess/chat-api/data-access-message';
import { MessageDto } from '@nx-mess/chat-api/data-access-shared';

@Controller('messages')
@ApiTags('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  @ApiOkResponse({ type: MessageDto, isArray: true })
  async getAll(): Promise<MessageDto[]> {
    return await this.messageService.getAllMessages();
  }
}
