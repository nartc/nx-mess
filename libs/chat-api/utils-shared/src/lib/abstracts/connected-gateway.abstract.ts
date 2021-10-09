import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import * as io from 'socket.io';

export abstract class ConnectedGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  protected server!: io.Server;
  protected readonly connectedClients = new Map<string, io.Socket>();

  /**
   * GatewayConnection only happens when the Frontend has done checking for authentication.
   */
  handleConnection(client: io.Socket) {
    this.connectedClients.set(client.id, client);
  }

  /**
   * GatewayDisconnect happens when the user logs out or when the app is refreshed
   */
  handleDisconnect(client: io.Socket) {
    this.connectedClients.delete(client.id);
  }
}
