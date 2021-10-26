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
  private readonly typingGroup = new Set<string>();

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
      this.typingGroup.delete(user.userId);
      client.broadcast.emit(
        ServerSocketEvents.WhoIsTyping,
        Array.from(this.typingGroup.values())
      );
      client.broadcast.emit(ServerSocketEvents.UserOffline, user);
    }
  }

  @SubscribeMessage(ClientSocketEvents.Typing)
  async handleClientTyping(
    @ConnectedSocket() client: io.Socket,
    @MessageBody() whoIsTyping: { isTyping: boolean; userId: string }
  ) {
    const connectedUser = this.connectedUserInfo.get(client.id);
    if (connectedUser && connectedUser.userId === whoIsTyping.userId) {
      if (whoIsTyping.isTyping) {
        this.typingGroup.add(connectedUser.userId);
      } else {
        this.typingGroup.delete(connectedUser.userId);
      }

      client.broadcast.emit(
        ServerSocketEvents.WhoIsTyping,
        Array.from(this.typingGroup.values())
      );
    }
  }
}
