import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { ApoderadosModule } from 'src/apoderados/apoderados.module';

@Module({
  imports: [ApoderadosModule],
  controllers: [AlumnosController],
  providers: [AlumnosService],
})
export class AlumnosModule {}
