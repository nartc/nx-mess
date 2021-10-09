import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../base.dto';
import { UserDto } from '../user/user.dto';

export class NotificationDto extends BaseDto {
  @ApiProperty({ type: () => UserDto })
  @AutoMap({ typeFn: () => UserDto })
  actor!: UserDto;
  @ApiProperty({ type: () => UserDto })
  @AutoMap({ typeFn: () => UserDto })
  receiver!: UserDto;
  @ApiProperty()
  @AutoMap()
  isRead!: boolean;
}
