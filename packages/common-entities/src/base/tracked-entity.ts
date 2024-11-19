import {
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base-entity';

export abstract class TrackedEntity  extends BaseEntity
{
  @ApiProperty({
    type: Date,
    description: 'Created at date time in ISO format',
  })
  @Expose({
    toPlainOnly: true,
  })
  @CreateDateColumn()
  createdAt!: Date; // 创建时间

  @ApiProperty({
    type: Date,
    description: 'Last time updated at date time in ISO format',
  })
  @Expose({
    toPlainOnly: true,
  })
  @UpdateDateColumn()
  updatedAt!: Date; // 更新时间

  @ApiProperty({
    type: Date,
    description: 'Deleted at date time in ISO format',
  })
  @Expose({
    toPlainOnly: true,
  })
  @DeleteDateColumn()
  deletedAt?: Date;  // 删除时间
}
