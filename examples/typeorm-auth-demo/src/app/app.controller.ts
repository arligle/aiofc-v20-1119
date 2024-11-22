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
    const doc = new Doc();
    doc.firstName = '张学友1';
    doc.lastName = 'Jack1';
    doc.isActive = true;
    doc.save();

    const res =this.docRepository.find();

    this.docRepository.insert(doc);
    return res;

    // return this.appService.getData();
  }
}
