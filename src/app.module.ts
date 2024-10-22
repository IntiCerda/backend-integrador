import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TryModule } from './try/try.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { ApoderadosModule } from './apoderados/apoderados.module';
import { CursosModule } from './cursos/cursos.module';
import { PeriodoModule } from './periodo/periodo.module';
import { AdminModule } from './admin/admin.module';
import { NoticiasModule } from './noticias/noticias.module';
import { ForoModule } from './foro/foro.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { NotasModule } from './notas/notas.module';
import './firebase.config'; 

@Module({
  imports: [UsersModule, TryModule, AlumnosModule, AsignaturaModule, ProfesoresModule, ApoderadosModule, CursosModule, PeriodoModule, AdminModule, NoticiasModule, ForoModule, ComentariosModule, AsistenciaModule, NotasModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}