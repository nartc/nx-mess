import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Auth0Config, InjectAuth0Config } from '@nx-mess/chat-api/config/utils';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectAuth0Config() auth0Config: Auth0Config) {
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

  validate(payload: unknown) {
    console.log(payload);
    return payload;
  }
}
