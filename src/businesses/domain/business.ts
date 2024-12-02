import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FileType } from '../../files/domain/file';
import { Status } from '../../statuses/domain/status';

const idType = Number;
export class Business {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'HairDresser',
  })
  @Expose({ groups: ['me', 'admin', 'owner'] })
  name: string | null;

  @ApiProperty({
    type: String,
    example: 'HairDresser description',
  })
  @Expose({ groups: ['me', 'admin', 'owner'] })
  description: string | null;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Expose({ groups: ['me', 'admin', 'owner'] })
  email: string | null;

  @ApiProperty({
    type: String,
    example: '733211211',
  })
  @Expose({ groups: ['me', 'admin', 'owner'] })
  phoneNumber: string;

  @ApiProperty({
    type: String,
    example: 'https://business.com',
  })
  @Expose({ groups: ['me', 'admin', 'owner'] })
  websiteUrl?: string | null;

  @ApiProperty({
    type: () => FileType,
  })
  coverPhoto?: FileType | null;

  @ApiProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
