import { InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Auth0UserDto,
  BaseService,
  ModelType,
  UserDto,
} from '@nx-mess/chat-api/data-access-shared';
import {
  CREATE_USER_FROM_AUTH0,
  InjectUserQueue,
  UPDATE_USER_FROM_AUTH0,
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
  }

  async updateUserPictureFromAuth0(auth0Id: string, picture: string) {
    const user = await this.getUserByAuth0Id(auth0Id);
    if (!user) throw new NotFoundException('No User found');

    if (user.picture === picture) return;

    await this.userQueue.add(UPDATE_USER_FROM_AUTH0, { ...user, picture });
  }

  async getMe(auth0UserId: string): Promise<UserDto> {
    const user = await this.getUserByAuth0Id(auth0UserId);

    if (!user) throw new NotFoundException('No User found');

    return this.mapper.map(user, UserDto, User);
  }

  async getUserByAuth0Id(auth0UserId: string): Promise<User> {
    return await this.findOne().where('userId').equals(auth0UserId).exec();
  }
}
