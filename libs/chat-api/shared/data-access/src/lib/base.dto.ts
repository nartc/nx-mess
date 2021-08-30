import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
  @ApiProperty({ type: Boolean, default: false })
  active!: boolean;
  @ApiProperty()
  id!: string;
}
