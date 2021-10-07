import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({ type: String, format: 'date-time' })
  @AutoMap()
  createdAt!: Date;
  @ApiProperty({ type: String, format: 'date-time' })
  @AutoMap()
  updatedAt!: Date;
  @ApiProperty({ type: Boolean, default: false })
  @AutoMap()
  active!: boolean;
  @ApiProperty()
  @AutoMap()
  id!: string;
}
