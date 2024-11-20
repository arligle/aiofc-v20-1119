import { BaseEntity } from './base.entity';
// 基础的可追踪的实体接口，继承了 BaseEntity
export interface BaseTrackedEntity extends BaseEntity {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
