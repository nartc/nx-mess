import { WebSocketGateway } from '@nestjs/websockets';
import { MessageService } from '@nx-mess/chat-api/message/data-access';

@WebSocketGateway()
export class MessageGateway {
  constructor(private messageService: MessageService) {}
}
