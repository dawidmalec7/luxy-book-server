import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, plainToInstance } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Business } from '../domain/business';

export class FilterBusinessDto {}

export class SortBusinessDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Business;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryBusinessDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterBusinessDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterBusinessDto)
  filters?: FilterBusinessDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortBusinessDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortBusinessDto)
  sort?: SortBusinessDto[] | null;
}
