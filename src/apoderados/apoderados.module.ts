import { Module } from '@nestjs/common';
import { ApoderadosService } from './apoderados.service';
import { ApoderadosController } from './apoderados.controller';
import { AlumnosModule } from 'src/alumnos/alumnos.module';

@Module({
  imports: [AlumnosModule],
  controllers: [ApoderadosController],
  providers: [ApoderadosService],
})
export class ApoderadosModule {}
