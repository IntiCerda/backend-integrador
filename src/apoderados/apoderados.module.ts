import { Module } from '@nestjs/common';
import { ApoderadosService } from './apoderados.service';
import { ApoderadosController } from './apoderados.controller';

@Module({
  controllers: [ApoderadosController],
  providers: [ApoderadosService],
})
export class ApoderadosModule {}
