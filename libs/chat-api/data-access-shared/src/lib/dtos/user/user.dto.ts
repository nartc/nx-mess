import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../../base.dto';

export class UserDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  username!: string;
  @ApiProperty()
  @AutoMap()
  userId!: string;
  @ApiPropertyOptional()
  @AutoMap()
  name?: string;
  @ApiPropertyOptional()
  @AutoMap()
  givenName?: string;
  @ApiPropertyOptional()
  @AutoMap()
  familyName?: string;
  @ApiPropertyOptional()
  @AutoMap()
  nickname?: string;
  @ApiPropertyOptional()
  @AutoMap()
  email?: string;
  @ApiPropertyOptional()
  @AutoMap()
  phoneNumber?: string;
  @ApiPropertyOptional()
  @AutoMap()
  picture?: string;
}
