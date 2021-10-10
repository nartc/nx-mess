import { ApiProperty } from '@nestjs/swagger';

export class CreateGeneralMessageDto {
  @ApiProperty()
  message!: string;
}
