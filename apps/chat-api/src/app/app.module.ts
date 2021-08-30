import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatApiAuth0FeatureModule } from '@nx-mess/chat-api/auth0/feature';
import { ChatApiConfigFeatureModule } from '@nx-mess/chat-api/config/feature';
import {
  MongoConfig,
  mongoConfiguration,
} from '@nx-mess/chat-api/config/utils';

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
  ],
})
export class AppModule {}
