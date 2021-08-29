import { ConfigType, registerAs } from '@nestjs/config';

export const appConfiguration = registerAs('app', () => ({
  protocol: process.env.APP_PROTOCOL || 'http',
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || 3000,
  get domain() {
    return `${this.protocol}://${this.host}:${this.port}`;
  },
}));

export type AppConfig = Readonly<ConfigType<typeof appConfiguration>>;
