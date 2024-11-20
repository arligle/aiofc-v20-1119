import {
  BaseEntity as TypeormBaseEntity,
} from 'typeorm';
/**
 * BaseEntity 来自于 TypeORM，是所有实体的基本抽象实体，在 ActiveRecord 模式中使用。
 * https://github1s.com/typeorm/typeorm/blob/master/src/repository/BaseEntity.ts
 * BaseEntity 即原来的 EntityHelper
 */
export abstract class BaseEntity extends TypeormBaseEntity {}

