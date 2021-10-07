import { Process, Processor } from '@nestjs/bull';
import { USER_QUEUE } from '@nx-mess/chat-api/utils-shared';
import { CREATE_USER_FROM_AUTH0 } from '@nx-mess/chat-api/utils-user';
import { Job } from 'bull';
import { User } from './user.model';
import { UserService } from './user.service';

@Processor(USER_QUEUE)
export class UserConsumer {
  constructor(private userService: UserService) {}

  @Process(CREATE_USER_FROM_AUTH0)
  async createFromAuth0(job: Job<User>) {
    const user = await this.userService.create(job.data);
    return user!.id;
  }
}
