import { DataSource, FindOptionsWhere, In, IsNull, Not } from 'typeorm';
import { BaseTypeormEntityRepository } from './base-typeorm-entity.repository';
import { ITrackedRepository, LimitOptions } from '@aiofc/persistence-api';
import { ObjectType } from 'typeorm/common/ObjectType';
import { AbstractBaseTrackedEntity } from '../entity/abstract-base-tracked.entity';

export abstract class BaseTypeormTrackedEntityRepository<
    ENTITY extends AbstractBaseTrackedEntity,
    ID extends keyof ENTITY,
    FIELDS_REQUIRED_FOR_UPDATE extends keyof ENTITY = ID,
    AUTO_GENERATED_FIELDS extends keyof ENTITY =
      | keyof AbstractBaseTrackedEntity
      | ID,
  >
  extends BaseTypeormEntityRepository<
    ENTITY,
    ID,
    FIELDS_REQUIRED_FOR_UPDATE,
    AUTO_GENERATED_FIELDS
  >
  implements ITrackedRepository<ENTITY, ID, FindOptionsWhere<ENTITY>>
{
  protected constructor(
    entityTarget: ObjectType<ENTITY>,
    dataSource: DataSource,
    idFieldName: ID,
  ) {
    super(entityTarget, dataSource, idFieldName);
  }

  archive(criteria: ENTITY[ID]): Promise<boolean>;
  archive(criteria: Array<ENTITY[ID]>): Promise<boolean>;

  async archive(criteria: ENTITY[ID] | Array<ENTITY[ID]>): Promise<boolean> {
    const result = await this.updateByQuery(
      {
        deletedAt: new Date(),
      } as Partial<ENTITY>,
      {
        [this.idFieldName]: Array.isArray(criteria) ? In(criteria) : criteria,
        deletedAt: IsNull(),
      } as FindOptionsWhere<ENTITY>,
    );

    return Array.isArray(criteria) ? result === criteria.length : result === 1;
  }

  restore(id: ENTITY[ID]): Promise<boolean>;
  restore(ids: Array<ENTITY[ID]>): Promise<boolean>;

  async restore(id: ENTITY[ID] | Array<ENTITY[ID]>): Promise<boolean> {
    const result = await this.updateByQuery(
      {
        deletedAt: null,
      } as unknown as Partial<ENTITY>,
      {
        id: Array.isArray(id) ? In(id) : id,
        deletedAt: Not(IsNull()),
      } as FindOptionsWhere<NonNullable<ENTITY>>,
    );

    return Array.isArray(id) ? result === id.length : result === 1;
  }

  async findAllWithArchived(
    where: FindOptionsWhere<ENTITY>,
    limitOptions?: LimitOptions,
  ): Promise<ENTITY[]> {
    return this.typeormRepository.find({
      where: this.presetWhereOptions(where),
      take: limitOptions?.limit ?? 20,
      skip: limitOptions?.offset ?? 0,
      withDeleted: true,
    });
  }
}
