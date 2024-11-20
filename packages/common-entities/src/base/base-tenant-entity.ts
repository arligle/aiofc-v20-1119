import { Column, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TrackedEntity } from './tracked-entity';
import { ClsPreset } from '../subscribers/decorator/cls-preset.decorator';
import { TenantClsStore } from '../decorator/vo/tenant-base-cls-store';

export class BaseTenantEntity
  extends TrackedEntity
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
