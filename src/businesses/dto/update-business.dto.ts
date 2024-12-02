import { ApiPropertyOptional } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsEmail, IsOptional, Max } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class UpdateBusinessDto {
  @ApiPropertyOptional({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'HairDresser', type: String })
  name: string;

  @ApiPropertyOptional({ example: 'HairDresser description', type: String })
  @Max(500)
  description: string;

  @ApiPropertyOptional({ type: () => FileDto })
  coverPhoto: FileDto;

  @ApiPropertyOptional({ type: () => String })
  phoneNumber: string;

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status: StatusDto;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Type(() => String)
  websiteUrl?: string | null;
}
