import { ConfigType, registerAs } from '@nestjs/config';

export const auth0Configuration = registerAs('auth0', () => ({
  issuerUrl: process.env.AUTH0_ISSUER_URL,
  audience: process.env.AUTH0_AUDIENCE,
  userClaimKey: process.env.AUTH0_USER_CLAIM_KEY || 'https://localhost/user',
}));

export type Auth0Config = Readonly<ConfigType<typeof auth0Configuration>>;
