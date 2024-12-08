import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { DocRepository } from '../repositories/doc.repository';

@Controller()
export class AppController {
  constructor(

    private readonly appService: AppService,
    private readonly docRepository: DocRepository,
    // @InjectRepository(Doc)
    // private docRepository: AbstractRepository<Doc,'id',any>,
  ) {}

  @Get()
  getData() {
    // const doc = new Doc();
    // doc.firstName = '张学友1';
    // doc.lastName = 'Jack1';
    // doc.isActive = true;
    // doc.save();

    const res =this.docRepository.findAll();

    // this.docRepository.insert(doc);
    return res;

    // return this.appService.getData();
  }
}
