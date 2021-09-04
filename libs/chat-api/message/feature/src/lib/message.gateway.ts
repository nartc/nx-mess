import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { WebSocketGateway } from '@nestjs/websockets';
import { MessageService } from '@nx-mess/chat-api/message/data-access';
import { UserService } from '@nx-mess/chat-api/user/data-access';
import { InjectUserQueue } from '@nx-mess/chat-api/user/utils';
import { Queue } from 'bull';

@WebSocketGateway()
export class MessageGateway {
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    @InjectUserQueue() private userQueue: Queue,
    @InjectMapper() private mapper: Mapper
  ) {}
}
