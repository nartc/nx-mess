import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  appConfiguration,
  auth0Configuration,
  mongoConfiguration,
} from '@nx-mess/chat-api/config/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration, auth0Configuration, mongoConfiguration],
    }),
  ],
})
export class ChatApiConfigFeatureModule {}
