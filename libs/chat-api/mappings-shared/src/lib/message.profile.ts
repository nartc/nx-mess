import {
  mapFrom,
  mapWith,
  nullSubstitution,
  preCondition,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { Message } from '@nx-mess/chat-api/data-access-message';
import {
  BaseDto,
  BaseModel,
  MessageDto,
  UserDto,
} from '@nx-mess/chat-api/data-access-shared';
import { User } from '@nx-mess/chat-api/data-access-user';

@Injectable()
export class MessageProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      const baseMapping = mapper.getMapping(BaseModel, BaseDto);

      mapper
        .createMap(Message, MessageDto, { extends: [baseMapping] })
        .forMember(
          (d) => d.reactions,
          mapFrom((s) => s.reactions)
        )
        .forMember(
          (d) => d.sender,
          mapWith(UserDto, User, (s) => s.sender)
        )
        .forMember(
          (d) => d.receiver,
          preCondition((s) => !!s.receiver),
          mapWith(UserDto, User, (s) => s.receiver)
        )
        .forMember((d) => d.attachmentThumbnail, nullSubstitution(''))
        .forMember((d) => d.attachmentOriginal, nullSubstitution(''));
    };
  }
}
