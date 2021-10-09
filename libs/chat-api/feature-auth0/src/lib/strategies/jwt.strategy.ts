import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Auth0UserDto } from '@nx-mess/chat-api/data-access-shared';
import { User, UserService } from '@nx-mess/chat-api/data-access-user';
import { Auth0Config, InjectAuth0Config } from '@nx-mess/chat-api/utils-config';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectAuth0Config() private auth0Config: Auth0Config,
    @InjectMapper() private mapper: Mapper,
    private userService: UserService
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${auth0Config.issuerUrl}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: auth0Config.audience,
      issuer: auth0Config.issuerUrl,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: Record<string, unknown>, done: VerifiedCallback) {
    const auth0UserId = payload[this.auth0Config.userIdClaimKey] as string;
    if (!auth0UserId)
      return done(new UnauthorizedException('No UserId in claim'), null);

    const user = await this.userService.getUserByAuth0Id(auth0UserId);

    if (!user) return done(new UnauthorizedException('No User found'), null);
    return done(null, this.mapper.map(user, Auth0UserDto, User));
  }
}
