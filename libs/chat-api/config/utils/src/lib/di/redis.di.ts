import { Inject } from '@nestjs/common';
import { redisConfiguration } from '../configurations';

export const InjectRedisConfig = () => Inject(redisConfiguration.KEY);
