import { DataSource } from 'typeorm';
import { InjectDataSource } from '@aiofc/nestjs-typeorm';
import { Doc } from '../database/entities';
export class DocRepository extends BaseTypeormTrackedEntityRepository<
  Doc,
  'id',
  any
> {
  constructor(
    @InjectDataSource()
    ds: DataSource
  ) {
    super(Doc, ds, 'id');
  }
}
