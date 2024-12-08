import { Module, forwardRef } from '@nestjs/common';
import { ForoService } from './foro.service';
import { ForoController } from './foro.controller';
import { ForoComentarioModule } from '../foro-comentario/foro-comentario.module';
import { AsignaturaModule } from '../asignatura/asignatura.module';

@Module({
  imports: [forwardRef(() => ForoComentarioModule),AsignaturaModule],
  providers: [ForoService],
  controllers: [ForoController],
  exports: [ForoService],
})
export class ForoModule {}