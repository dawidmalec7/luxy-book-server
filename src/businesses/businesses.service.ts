import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileType } from '../files/domain/file';
import { FilesService } from '../files/files.service';
import { Status } from '../statuses/domain/status';
import { StatusEnum } from '../statuses/statuses.enum';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Business } from './domain/business';
import { CreateBusinessDto } from './dto/create-business.dto';
import { FilterBusinessDto, SortBusinessDto } from './dto/query-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessRepository } from './infrastructure/persistence/business.repository';

@Injectable()
export class BusinessesService {
  constructor(
    private readonly businessesRepository: BusinessRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    // Do not remove comment below.
    // <creating-property />

    let photo: FileType | null | undefined = undefined;

    if (createBusinessDto.coverPhoto?.id) {
      const fileObject = await this.filesService.findById(
        createBusinessDto.coverPhoto.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      photo = fileObject;
    } else if (createBusinessDto.coverPhoto === null) {
      photo = null;
    }

    let status: Status | undefined = undefined;

    if (createBusinessDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(createBusinessDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: createBusinessDto.status.id,
      };
    }

    return this.businessesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      email: createBusinessDto.email,
      name: createBusinessDto.name,
      description: createBusinessDto.description,
      coverPhoto: photo,
      phoneNumber: createBusinessDto.phoneNumber,
      status: status,
      websiteUrl: createBusinessDto.websiteUrl,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterBusinessDto | null;
    sortOptions?: SortBusinessDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Business[]> {
    return this.businessesRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Business['id']): Promise<NullableType<Business>> {
    return this.businessesRepository.findById(id);
  }

  findByIds(ids: Business['id'][]): Promise<Business[]> {
    return this.businessesRepository.findByIds(ids);
  }

  async update(
    id: Business['id'],
    updateBusinessDto: UpdateBusinessDto,
  ): Promise<Business | null> {
    // Do not remove comment below.
    // <updating-property />

    let photo: FileType | null | undefined = undefined;

    if (updateBusinessDto.coverPhoto?.id) {
      const fileObject = await this.filesService.findById(
        updateBusinessDto.coverPhoto.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      photo = fileObject;
    } else if (updateBusinessDto.coverPhoto === null) {
      photo = null;
    }

    let status: Status | undefined = undefined;

    if (updateBusinessDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(updateBusinessDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: updateBusinessDto.status.id,
      };
    }

    return this.businessesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      email: updateBusinessDto.email,
      name: updateBusinessDto.name,
      description: updateBusinessDto.description,
      coverPhoto: photo,
      phoneNumber: updateBusinessDto.phoneNumber,
      status,
      websiteUrl: updateBusinessDto.websiteUrl,
    });
  }

  async remove(id: Business['id']): Promise<void> {
    await this.businessesRepository.remove(id);
  }
}
