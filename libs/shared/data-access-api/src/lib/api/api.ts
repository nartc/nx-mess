export * from './messages.service';
import { MessagesApiService } from './messages.service';
export * from './users.service';
import { UsersApiService } from './users.service';
export const APIS = [MessagesApiService, UsersApiService];
