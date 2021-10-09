import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatApiAuth0FeatureModule } from '@nx-mess/chat-api/feature-auth0';
import { ChatApiConfigFeatureModule } from '@nx-mess/chat-api/feature-config';
import { ChatApiMessageFeatureModule } from '@nx-mess/chat-api/feature-message';
import { ChatApiNotificationFeatureModule } from '@nx-mess/chat-api/feature-notification';
import { ChatApiUserFeatureModule } from '@nx-mess/chat-api/feature-user';
import {
  MongoConfig,
  mongoConfiguration,
  RedisConfig,
  redisConfiguration,
} from '@nx-mess/chat-api/utils-config';

@Module({
  imports: [
    ChatApiConfigFeatureModule,
    ChatApiAuth0FeatureModule,
    MongooseModule.forRootAsync({
      useFactory: (mongoConfig: MongoConfig) => ({
        uri: mongoConfig.uri,
        dbName: mongoConfig.dbName,
      }),
      inject: [mongoConfiguration.KEY],
    }),
    AutomapperModule.forRoot({
      singular: true,
      options: [
        {
          name: 'classes',
          pluginInitializer: classes,
        },
      ],
    }),
    BullModule.forRootAsync({
      useFactory: (redisConfig: RedisConfig) => ({
        redis: {
          host: redisConfig.host,
          port: redisConfig.port,
        },
      }),
      inject: [redisConfiguration.KEY],
    }),
    EventEmitterModule.forRoot(),
    ChatApiUserFeatureModule,
    ChatApiMessageFeatureModule,
    ChatApiNotificationFeatureModule,
  ],
})
export class AppModule {}
