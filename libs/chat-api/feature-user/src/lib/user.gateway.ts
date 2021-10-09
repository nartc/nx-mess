import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UserService } from '@nx-mess/chat-api/data-access-user';
import { ConnectedGateway } from '@nx-mess/chat-api/utils-shared';
import {
  ClientSocketEvents,
  ServerSocketEvents,
} from '@nx-mess/shared/utils-socket-constants';
import * as io from 'socket.io';

@WebSocketGateway()
export class UserGateway extends ConnectedGateway {
  constructor(private userService: UserService) {
    super();
  }

  @SubscribeMessage(ClientSocketEvents.ClientConnected)
  async handleClientConnected(
    @ConnectedSocket() client: io.Socket,
    @MessageBody() userId: string
  ) {
    const user = await this.userService.getUserByAuth0Id(userId);
    if (user) {
      client.broadcast.emit(ServerSocketEvents.UserOnline, user);
    }
  }

  @SubscribeMessage(ClientSocketEvents.ClientDisconnected)
  async handleClientDisconnected(
    @ConnectedSocket() client: io.Socket,
    @MessageBody() userId: string
  ) {
    const user = await this.userService.getUserByAuth0Id(userId);
    if (user) {
      client.broadcast.emit(ServerSocketEvents.UserOffline, user);
    }
  }
}
