import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from '@nx-mess/chat-api/notification/data-access';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
}
