import { ConfigType, registerAs } from '@nestjs/config';

export const auth0Configuration = registerAs('auth0', () => ({
  issuerUrl: process.env.AUTH0_ISSUER_URL,
  audience: process.env.AUTH0_AUDIENCE,
}));

export type Auth0Config = Readonly<ConfigType<typeof auth0Configuration>>;
