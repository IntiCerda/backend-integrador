import { Module } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaController } from './asignatura.controller';
import { ProfesoresModule } from 'src/profesores/profesores.module';
import { CursosModule } from 'src/cursos/cursos.module';

@Module({
  imports: [ProfesoresModule, CursosModule],
  controllers: [AsignaturaController],
  providers: [AsignaturaService],
})
export class AsignaturaModule {}
