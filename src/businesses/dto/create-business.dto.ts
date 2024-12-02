import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  Transform,
  Type,
} from 'class-transformer';
import {
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Max,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreateBusinessDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'HairDresser', type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'HairDresser description', type: String })
  @Max(500)
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: () => FileDto })
  @IsNotEmpty()
  coverPhoto: FileDto;

  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status: StatusDto;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  websiteUrl?: string | null;
}
