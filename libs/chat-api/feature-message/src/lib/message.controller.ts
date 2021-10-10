import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessageService } from '@nx-mess/chat-api/data-access-message';
import {
  Auth0UserDto,
  CreateGeneralMessageDto,
  MessageDto,
} from '@nx-mess/chat-api/data-access-shared';
import { ApiErrors, CurrentUser } from '@nx-mess/chat-api/utils-shared';

@Controller('messages')
@ApiTags('messages')
@ApiErrors()
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  @ApiOkResponse({ type: MessageDto, isArray: true })
  async getAll(
    @CurrentUser() currentUser: Auth0UserDto
  ): Promise<MessageDto[]> {
    return await this.messageService.getAllMessages();
  }

  @Post('general')
  @ApiCreatedResponse({ type: MessageDto })
  async createGeneralMessage(
    @CurrentUser() currentUser: Auth0UserDto,
    @Body() dto: CreateGeneralMessageDto
  ): Promise<MessageDto> {
    return await this.messageService.createGeneralMessage(dto, currentUser.id);
  }
}
