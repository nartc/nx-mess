import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../../base.dto';
import { MessageReactionType } from '../../enums';
import { UserDto } from '../user/user.dto';

export class MessageDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  text!: string;
  @ApiProperty({ type: () => UserDto })
  @AutoMap({ typeFn: () => UserDto })
  sender!: UserDto;
  @ApiPropertyOptional({ type: () => UserDto })
  @AutoMap({ typeFn: () => UserDto })
  receiver?: UserDto;
  @ApiPropertyOptional()
  @AutoMap()
  attachmentThumbnail?: string;
  @ApiPropertyOptional()
  @AutoMap()
  attachmentOriginal?: string;
  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    default: {},
  })
  reactions!: Map<string, MessageReactionType>;
}
