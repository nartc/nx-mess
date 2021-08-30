import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService, ModelType } from '@nx-mess/chat-api/shared/data-access';
import { User } from './user.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel(User.name) userModel: ModelType<User>) {
    super(userModel);
  }

  async createFromAuth0() {
    return 'created';
  }
}
