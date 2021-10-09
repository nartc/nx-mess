import { InjectQueue } from '@nestjs/bull';
import { MESSAGE_QUEUE } from '@nx-mess/chat-api/utils-shared';

export const InjectMessageQueue = () => InjectQueue(MESSAGE_QUEUE);
