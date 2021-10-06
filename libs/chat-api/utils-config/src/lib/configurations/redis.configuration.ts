import { ConfigType, registerAs } from '@nestjs/config';

export const redisConfiguration = registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
}));

export type RedisConfig = ConfigType<typeof redisConfiguration>;
