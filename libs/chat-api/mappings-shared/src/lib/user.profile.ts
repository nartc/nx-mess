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
import {
  Auth0UserDto,
  BaseDto,
  BaseModel,
  UserDto,
} from '@nx-mess/chat-api/data-access-shared';
import { User } from '@nx-mess/chat-api/data-access-user';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      const baseMapping = mapper.getMapping(BaseModel, BaseDto);

      mapper.createMap(User, UserDto, { extends: [baseMapping] });
      mapper.createMap(User, Auth0UserDto, {
        namingConventions: {
          source: new CamelCaseNamingConvention(),
          destination: new SnakeCaseNamingConvention(),
        },
      });
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
