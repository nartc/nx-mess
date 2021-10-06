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

  /**
   * GatewayConnection only happens when the Frontend has done checking for authentication.
   */
  handleConnection(client: io.Socket) {
    this.connectedClients.add(client.id);
  }

  /**
   * GatewayDisconnect happens when the user logs out or when the app is refreshed
   */
  handleDisconnect(client: io.Socket) {
    this.connectedClients.delete(client.id);
  }
}
