import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { Business } from '../../../../domain/business';
import { BusinessEntity } from '../entities/business.entity';

export class BusinessMapper {
  static toDomain(raw: BusinessEntity): Business {
    const domainEntity = new Business();
    domainEntity.id = raw.id;
    domainEntity.email = raw.email;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.phoneNumber = raw.phoneNumber;
    domainEntity.websiteUrl = raw.websiteUrl;
    if (raw.coverPhoto) {
      domainEntity.coverPhoto = FileMapper.toDomain(raw.coverPhoto);
    }
    domainEntity.status = raw.status;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Business): BusinessEntity {
    let coverPhoto: FileEntity | undefined | null = undefined;

    if (domainEntity.coverPhoto) {
      coverPhoto = new FileEntity();
      coverPhoto.id = domainEntity.coverPhoto.id;
      coverPhoto.path = domainEntity.coverPhoto.path;
    } else if (domainEntity.coverPhoto === null) {
      coverPhoto = null;
    }

    let status: StatusEntity | undefined = undefined;

    if (domainEntity.status) {
      status = new StatusEntity();
      status.id = Number(domainEntity.status.id);
    }

    const persistenceEntity = new BusinessEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.phoneNumber = domainEntity.phoneNumber;
    persistenceEntity.websiteUrl = domainEntity.websiteUrl;
    persistenceEntity.coverPhoto = coverPhoto;
    persistenceEntity.status = status;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
