import {
  CamelCaseNamingConvention,
  fromValue,
  ignore,
  mapFrom,
  SnakeCaseNamingConvention,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { User } from '@nx-mess/chat-api/user/data-access';
import { Auth0UserDto } from '../dtos/user/auth0-user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper
        .createMap(Auth0UserDto, User, {
          namingConventions: {
            source: new SnakeCaseNamingConvention(),
            destination: new CamelCaseNamingConvention(),
          },
        })
        .forMember(
          (d) => d.createdAt,
          mapFrom((s) => new Date(s.created_at))
        )
        .forMember(
          (d) => d.updatedAt,
          mapFrom((s) => new Date(s.updated_at))
        )
        .forMember((d) => d.id, ignore())
        .forMember((d) => d.active, fromValue(true));
    };
  }
}