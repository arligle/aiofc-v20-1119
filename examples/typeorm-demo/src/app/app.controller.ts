import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Repository } from 'typeorm';
import { Doc } from '../database/entities';
import { InjectRepository } from '@aiofc/nestjs-typeorm';

@Controller()
export class AppController {
  constructor(

    private readonly appService: AppService,
    @InjectRepository(Doc)
    private docRepository: Repository<Doc>,
  ) {}

  @Get()
  getData() {
    const res =this.docRepository.find();
    return res;

    // return this.appService.getData();
  }
}
