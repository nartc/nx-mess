export * from './messages.service';
import { MessagesApiService } from './messages.service';
export * from './notifications.service';
import { NotificationsApiService } from './notifications.service';
export * from './users.service';
import { UsersApiService } from './users.service';
export const APIS = [
  MessagesApiService,
  NotificationsApiService,
  UsersApiService,
];
