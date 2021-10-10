import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessageDto } from '@nx-mess/chat-api/data-access-shared';
import { ConnectedGateway } from '@nx-mess/chat-api/utils-shared';
import {
  ClientSocketEvents,
  ServerSocketEvents,
} from '@nx-mess/shared/utils-socket-constants';
import * as io from 'socket.io';

@WebSocketGateway()
export class MessageGateway extends ConnectedGateway {
  server!: io.Server;

  @SubscribeMessage(ClientSocketEvents.SendGeneralMessage)
  async handleGeneralMessage(
    @ConnectedSocket() client: io.Socket,
    @MessageBody() dto: MessageDto
  ) {
    client.broadcast.emit(ServerSocketEvents.BroadcastGeneralMessage, dto);
  }
}
