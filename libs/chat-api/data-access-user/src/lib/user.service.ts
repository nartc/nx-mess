import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Auth0UserDto,
  BaseService,
  ModelType,
} from '@nx-mess/chat-api/shared-data-access';
import {
  CREATE_USER_FROM_AUTH0,
  InjectUserQueue,
} from '@nx-mess/chat-api/utils-user';
import { Queue } from 'bull';
import { User } from './user.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.name) userModel: ModelType<User>,
    @InjectMapper() private mapper: Mapper,
    @InjectUserQueue() private userQueue: Queue
  ) {
    super(userModel);
  }

  async createFromAuth0(auth0User: Auth0UserDto) {
    const user = this.mapper.map(auth0User, User, Auth0UserDto);

    const exist = await this.findOne().where('email').equals(user.email).exec();

    if (exist) {
      throw new BadRequestException('Email exists');
    }

    await this.userQueue.add(CREATE_USER_FROM_AUTH0, user);

    return user;
  }
}
