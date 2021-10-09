import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  CREATE_GENERAL_MESSAGE,
  InjectMessageQueue,
} from '@nx-mess/chat-api/utils-message';
import { ConnectedGateway } from '@nx-mess/chat-api/utils-shared';
import { CreateGeneralMessageDto } from '@nx-mess/shared/data-access-dtos';
import {
  ClientSocketEvents,
  ServerSocketEvents,
} from '@nx-mess/shared/utils-socket-constants';
import { Queue } from 'bull';
import * as io from 'socket.io';

@WebSocketGateway()
export class MessageGateway extends ConnectedGateway {
  constructor(@InjectMessageQueue() private messageQueue: Queue) {
    super();
  }

  @SubscribeMessage(ClientSocketEvents.SendGeneralMessage)
  async handleGeneralMessage(
    @ConnectedSocket() client: io.Socket,
    @MessageBody() dto: CreateGeneralMessageDto
  ) {
    try {
      await this.messageQueue.add(CREATE_GENERAL_MESSAGE, dto);

      client.broadcast.emit(
        ServerSocketEvents.BroadcastGeneralMessageSuccess,
        dto
      );
    } catch (e) {
      client.emit(ServerSocketEvents.BroadcastGeneralMessageFailure, dto);
    }
  }
}
