import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UserDto } from '@nx-mess/chat-api/data-access-shared';
import { User, UserService } from '@nx-mess/chat-api/data-access-user';
import { ConnectedGateway } from '@nx-mess/chat-api/utils-shared';
import {
  ClientSocketEvents,
  ServerSocketEvents,
} from '@nx-mess/shared/utils-socket-constants';
import * as io from 'socket.io';

@WebSocketGateway()
export class UserGateway extends ConnectedGateway {
  private readonly connectedUserInfo = new Map<string, UserDto>();

  constructor(
    @InjectMapper() private mapper: Mapper,
    private userService: UserService
  ) {
    super();
  }

  @SubscribeMessage(ClientSocketEvents.ClientConnected)
  async handleClientConnected(
    @ConnectedSocket() client: io.Socket,
    @MessageBody() userId: string
  ) {
    const user = await this.userService.getUserByAuth0Id(userId);
    if (user) {
      client.emit(
        ServerSocketEvents.Online,
        this.mapper.mapArray(
          [...this.connectedUserInfo.values()],
          UserDto,
          User
        )
      );

      this.connectedUserInfo.set(client.id, user);
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
