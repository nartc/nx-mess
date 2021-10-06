import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessageService } from '@nx-mess/chat-api/message/data-access';
import * as io from 'socket.io';

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly connectedClients = new Set<string>();

  constructor(private messageService: MessageService) {}

  handleConnection(client: io.Socket) {
    if (!this.connectedClients.has(client.id)) {
      this.connectedClients.add(client.id);
    }
  }

  handleDisconnect(client: io.Socket) {
    if (this.connectedClients.has(client.id)) {
      this.connectedClients.delete(client.id);
    }
  }
}
