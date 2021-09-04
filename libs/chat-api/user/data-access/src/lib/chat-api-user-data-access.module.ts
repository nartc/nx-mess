import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RedisConfig,
  redisConfiguration,
} from '@nx-mess/chat-api/config/utils';
import { USER_QUEUE } from '@nx-mess/chat-api/shared/utils';
import { UserConsumer } from './user.consumer';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([User.feature]),
    BullModule.registerQueueAsync({
      name: USER_QUEUE,
      useFactory: (redisConfig: RedisConfig) => ({
        redis: {
          host: redisConfig.host,
          port: redisConfig.port,
        },
        name: USER_QUEUE,
      }),
      inject: [redisConfiguration.KEY],
    }),
  ],
  providers: [UserService, UserConsumer],
  exports: [UserService, BullModule],
})
export class ChatApiUserDataAccessModule {}
