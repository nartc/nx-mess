import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BaseProfile } from '@nx-mess/chat-api/mappings-shared';
import {
  appConfiguration,
  auth0Configuration,
  mongoConfiguration,
  redisConfiguration,
} from '@nx-mess/chat-api/utils-config';

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
  providers: [BaseProfile],
})
export class ChatApiConfigFeatureModule {}
