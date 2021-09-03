import { InjectQueue } from '@nestjs/bull';
import { USER_QUEUE } from '@nx-mess/chat-api/shared/utils';

export const InjectUserQueue = () => InjectQueue(USER_QUEUE);
