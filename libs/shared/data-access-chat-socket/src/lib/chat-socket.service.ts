import { Socket, SocketIoConfig } from 'ngx-socket-io';

export class ChatSocketService extends Socket {
  constructor(options: SocketIoConfig['options']) {
    super({ url: '', options });
  }
}
