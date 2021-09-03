import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  appConfiguration,
  auth0Configuration,
  mongoConfiguration,
  redisConfiguration,
} from '@nx-mess/chat-api/config/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfiguration,
        auth0Configuration,
        mongoConfiguration,
        redisConfiguration,
      ],
    }),
  ],
})
export class ChatApiConfigFeatureModule {}
