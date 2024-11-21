import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { AlumnosModule } from 'src/alumnos/alumnos.module';

@Module({
  imports: [AlumnosModule],
  controllers: [CursosController],
  providers: [CursosService],
  exports: [CursosService]
})
export class CursosModule {}
