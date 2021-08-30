import { Inject } from '@nestjs/common';
import { mongoConfiguration } from '../configurations';

export const InjectMongoConfig = () => Inject(mongoConfiguration.KEY);
