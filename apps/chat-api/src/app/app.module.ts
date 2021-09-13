import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatApiAuth0FeatureModule } from '@nx-mess/chat-api/auth0/feature';
import { ChatApiConfigFeatureModule } from '@nx-mess/chat-api/config/feature';
import {
  MongoConfig,
  mongoConfiguration,
  RedisConfig,
  redisConfiguration,
} from '@nx-mess/chat-api/config/utils';
import { ChatApiMessageFeatureModule } from '@nx-mess/chat-api/message/feature';
import { ChatApiNotificationFeatureModule } from '@nx-mess/chat-api/notification/feature';
import { ChatApiUserFeatureModule } from '@nx-mess/chat-api/user/feature';

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
    ChatApiUserFeatureModule,
    ChatApiMessageFeatureModule,
    ChatApiNotificationFeatureModule,
  ],
})
export class AppModule {}
