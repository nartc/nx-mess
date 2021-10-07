import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessageService } from '@nx-mess/chat-api/data-access-message';
import { Auth0UserDto, MessageDto } from '@nx-mess/chat-api/data-access-shared';
import { CurrentUser } from '@nx-mess/chat-api/utils-shared';

@Controller('messages')
@ApiTags('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  @ApiOkResponse({ type: MessageDto, isArray: true })
  async getAll(
    @CurrentUser() currentUser: Auth0UserDto
  ): Promise<MessageDto[]> {
    console.log({ currentUser });
    return await this.messageService.getAllMessages();
  }
}
