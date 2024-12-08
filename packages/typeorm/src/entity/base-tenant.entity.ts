import { Column, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AbstractBaseTrackedEntity } from './abstract-base-tracked.entity';
import { ClsPreset } from '../subscribers/decorator/cls-preset.decorator';
import { IBaseTenantedTrackedEntity, TenantClsStore } from '@aiofc/persistence-base';

export class BaseTenantEntity
  extends AbstractBaseTrackedEntity implements IBaseTenantedTrackedEntity
{
  @ApiProperty({
    description: 'Tenant identifier',
    type: 'string',
  })
  @ClsPreset<TenantClsStore>({
    clsFieldName: 'tenantId',
  })
  @Column({ nullable: false })
  @Index()
  @Expose()
  tenantId!: string; // 租户ID
}


