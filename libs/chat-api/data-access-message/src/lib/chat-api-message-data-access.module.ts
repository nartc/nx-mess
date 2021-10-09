import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RedisConfig,
  redisConfiguration,
} from '@nx-mess/chat-api/utils-config';
import { MESSAGE_QUEUE } from '@nx-mess/chat-api/utils-shared';
import { MessageConsumer } from './message.consumer';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Module({
  imports: [
    MongooseModule.forFeature([Message.feature]),
    BullModule.registerQueueAsync({
      name: MESSAGE_QUEUE,
      useFactory: (redisConfig: RedisConfig) => ({
        redis: {
          host: redisConfig.host,
          port: redisConfig.port,
        },
        name: MESSAGE_QUEUE,
      }),
      inject: [redisConfiguration.KEY],
    }),
  ],
  providers: [MessageService, MessageConsumer],
  exports: [MessageService, BullModule],
})
export class ChatApiMessageDataAccessModule {}
