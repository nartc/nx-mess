import { WebSocketGateway } from '@nestjs/websockets';
import { ConnectedGateway } from '@nx-mess/chat-api/utils-shared';

@WebSocketGateway()
export class NotificationGateway extends ConnectedGateway {
  constructor() {
    super();
  }
}
