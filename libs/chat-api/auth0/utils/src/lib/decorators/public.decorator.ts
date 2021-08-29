import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ENDPOINT = 'nx-mess:is-public';
export const IsPublic = () => SetMetadata(IS_PUBLIC_ENDPOINT, true);
