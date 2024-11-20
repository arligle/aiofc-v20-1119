import { BaseTrackedEntity } from './base-tracked.entity';
import { BaseEntity } from './base.entity';
// 基础的租户实体接口
export interface BaseTenantedEntity extends BaseEntity {
  tenantId: string;
}
// 基础的可追踪的租户实体接口，所以需要继承 BaseTenantedEntity 和 BaseTrackedEntity
export interface BaseTenantedTrackedEntity
  extends BaseTenantedEntity,
    BaseTrackedEntity {}
