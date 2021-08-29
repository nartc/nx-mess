import { Inject } from '@nestjs/common';
import { auth0Configuration } from '../configurations';

export const InjectAuth0Config = () => Inject(auth0Configuration.KEY);
