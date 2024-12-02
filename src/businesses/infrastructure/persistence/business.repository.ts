import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Business } from '../../domain/business';

import {
  FilterBusinessDto,
  SortBusinessDto,
} from '../../dto/query-business.dto';

export abstract class BusinessRepository {
  abstract create(
    data: Omit<Business, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Business>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterBusinessDto | null;
    sortOptions?: SortBusinessDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Business[]>;

  abstract findById(id: Business['id']): Promise<NullableType<Business>>;
  abstract findByIds(ids: Business['id'][]): Promise<Business[]>;
  abstract findByEmail(
    email: Business['email'],
  ): Promise<NullableType<Business>>;
  abstract update(
    id: Business['id'],
    payload: DeepPartial<Business>,
  ): Promise<Business | null>;

  abstract remove(id: Business['id']): Promise<void>;
}
