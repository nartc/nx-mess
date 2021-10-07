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
import { User } from '@nx-mess/chat-api/data-access-user';
import {
  Auth0UserDto,
  BaseDto,
  BaseModel,
  UserDto,
} from '@nx-mess/chat-api/shared-data-access';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      const baseMapping = mapper.getMapping(BaseModel, BaseDto);

      mapper.createMap(User, UserDto, { extends: [baseMapping] });

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
