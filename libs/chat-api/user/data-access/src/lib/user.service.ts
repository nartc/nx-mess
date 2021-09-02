import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService, ModelType } from '@nx-mess/chat-api/shared/data-access';
import { Auth0UserDto } from '@nx-mess/chat-api/shared/mappings';
import { User } from './user.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.name) userModel: ModelType<User>,
    @InjectMapper() private mapper: Mapper
  ) {
    super(userModel);
  }

  async createFromAuth0(auth0User: Auth0UserDto) {
    const user = this.mapper.map(auth0User, User, Auth0UserDto);

    const exist = await this.findOne().where('email').equals(user.email).exec();

    if (exist) {
      throw new BadRequestException('Email exists');
    }

    return user;
  }
}
