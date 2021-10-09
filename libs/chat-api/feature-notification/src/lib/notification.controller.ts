import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from '@nx-mess/chat-api/data-access-notification';
import {
  Auth0UserDto,
  NotificationDto,
} from '@nx-mess/chat-api/data-access-shared';
import { ApiErrors, CurrentUser } from '@nx-mess/chat-api/utils-shared';

@Controller('notifications')
@ApiTags('notifications')
@ApiErrors()
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  @ApiOkResponse({ type: NotificationDto, isArray: true })
  async getAllNotifications(
    @CurrentUser() currentUser: Auth0UserDto
  ): Promise<NotificationDto[]> {
    return await this.notificationService.getAllNotifications(currentUser.id);
  }
}
