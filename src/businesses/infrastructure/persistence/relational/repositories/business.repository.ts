import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Business } from '../../../../domain/business';
import { SortBusinessDto } from '../../../../dto/query-business.dto';
import { BusinessRepository } from '../../business.repository';
import { BusinessEntity } from '../entities/business.entity';
import { BusinessMapper } from '../mappers/business.mapper';

@Injectable()
export class BusinessRelationalRepository implements BusinessRepository {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly businessRepository: Repository<BusinessEntity>,
  ) {}

  async create(data: Business): Promise<Business> {
    const persistenceModel = BusinessMapper.toPersistence(data);
    const newEntity = await this.businessRepository.save(
      this.businessRepository.create(persistenceModel),
    );
    return BusinessMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortBusinessDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Business[]> {
    const entities = await this.businessRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((Business) => BusinessMapper.toDomain(Business));
  }

  async findById(id: Business['id']): Promise<NullableType<Business>> {
    const entity = await this.businessRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? BusinessMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Business['id'][]): Promise<Business[]> {
    const entities = await this.businessRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((Business) => BusinessMapper.toDomain(Business));
  }

  async findByEmail(email: Business['email']): Promise<NullableType<Business>> {
    if (!email) return null;

    const entity = await this.businessRepository.findOne({
      where: { email },
    });

    return entity ? BusinessMapper.toDomain(entity) : null;
  }

  async update(
    id: Business['id'],
    payload: Partial<Business>,
  ): Promise<Business> {
    const entity = await this.businessRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Business not found');
    }

    const updatedEntity = await this.businessRepository.save(
      this.businessRepository.create(
        BusinessMapper.toPersistence({
          ...BusinessMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return BusinessMapper.toDomain(updatedEntity);
  }

  async remove(id: Business['id']): Promise<void> {
    await this.businessRepository.softDelete(id);
  }
}
