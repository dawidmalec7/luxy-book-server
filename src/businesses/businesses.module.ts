import { Module } from '@nestjs/common';

import { RelationalBusinessPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';
import { BusinessesController } from './businesses.controller';
import { BusinessesService } from './businesses.service';

const infrastructurePersistenceModule = RelationalBusinessPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [BusinessesController],
  providers: [BusinessesService],
  exports: [BusinessesService, infrastructurePersistenceModule],
})
export class BusinessesModule {}
