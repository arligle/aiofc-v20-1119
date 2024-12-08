import { IBaseEntity } from './base-entity';
// 基础的租户实体接口
export interface IBaseTenantedEntity extends IBaseEntity {
  tenantId: string;
}

