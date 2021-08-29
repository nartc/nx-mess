import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ChatApiAuth0DataAccessModule } from '@nx-mess/chat-api/auth0/data-access';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ChatApiAuth0DataAccessModule,
  ],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class ChatApiAuth0FeatureModule {}
