import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BusinessDto {
  @ApiProperty({
    type: String,
    example: 'businessId',
  })
  @IsNotEmpty()
  id: string | number;
}
