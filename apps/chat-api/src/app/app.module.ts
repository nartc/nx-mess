import { Module } from '@nestjs/common';
import { ChatApiAuth0FeatureModule } from '@nx-mess/chat-api/auth0/feature';
import { ChatApiConfigFeatureModule } from '@nx-mess/chat-api/config/feature';

@Module({
  imports: [ChatApiConfigFeatureModule, ChatApiAuth0FeatureModule],
})
export class AppModule {}
