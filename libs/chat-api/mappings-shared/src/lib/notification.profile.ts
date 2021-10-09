import { mapWith } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Notification } from '@nx-mess/chat-api/data-access-notification';
import {
  BaseDto,
  BaseModel,
  NotificationDto,
  UserDto,
} from '@nx-mess/chat-api/data-access-shared';
import { User } from '@nx-mess/chat-api/data-access-user';

@Injectable()
export class NotificationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      const baseMapping = mapper.getMapping(BaseModel, BaseDto);
      mapper
        .createMap(Notification, NotificationDto, { extends: [baseMapping] })
        .forMember(
          (d) => d.actor,
          mapWith(UserDto, User, (s) => s.actor)
        );
    };
  }
}
