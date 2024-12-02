import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRepository } from '../business.repository';
import { BusinessEntity } from './entities/business.entity';
import { BusinessRelationalRepository } from './repositories/business.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity])],
  providers: [
    {
      provide: BusinessRepository,
      useClass: BusinessRelationalRepository,
    },
  ],
  exports: [BusinessRepository],
})
export class RelationalBusinessPersistenceModule {}
