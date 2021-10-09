import { ConfigType, registerAs } from '@nestjs/config';

export const auth0Configuration = registerAs('auth0', () => ({
  issuerUrl: process.env.AUTH0_ISSUER_URL,
  audience: process.env.AUTH0_AUDIENCE,
  userIdClaimKey:
    process.env.AUTH0_USER_ID_CLAIM_KEY || 'https://localhost/userId',
}));

export type Auth0Config = Readonly<ConfigType<typeof auth0Configuration>>;
