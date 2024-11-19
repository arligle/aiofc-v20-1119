import { Type } from '@nestjs/common';
import { MixedList } from 'typeorm';
import { TypeOrmConfigService } from '../config/typeorm-config.service';
import { TypeOrmOptionsFactory } from '@aiofc/nestjs-typeorm';

export interface SetupTypeormOptions {
  optionsFactory?: Type<TypeOrmOptionsFactory>;
  migrations?: MixedList<Function>;
}

export const DEFAULT_SETUP_TYPEORM_OPTIONS: SetupTypeormOptions = {
  optionsFactory: TypeOrmConfigService,
  migrations: [],
};
