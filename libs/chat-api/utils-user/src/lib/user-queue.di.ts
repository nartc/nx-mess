import { InjectQueue } from '@nestjs/bull';
import { USER_QUEUE } from '@nx-mess/chat-api/utils-shared';

export const InjectUserQueue = () => InjectQueue(USER_QUEUE);
