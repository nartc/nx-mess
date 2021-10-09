import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ChatApiAuth0DataAccessModule } from '@nx-mess/chat-api/data-access-auth0';
import { ChatApiUserDataAccessModule } from '@nx-mess/chat-api/data-access-user';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ChatApiAuth0DataAccessModule,
    ChatApiUserDataAccessModule,
  ],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class ChatApiAuth0FeatureModule {}
