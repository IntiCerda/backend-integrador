import { Module, forwardRef } from '@nestjs/common';
import { ForoService } from './foro.service';
import { ForoController } from './foro.controller';
import { ForoComentarioModule } from '../foro-comentario/foro-comentario.module';

@Module({
  imports: [forwardRef(() => ForoComentarioModule)],
  providers: [ForoService],
  controllers: [ForoController],
  exports: [ForoService],
})
export class ForoModule {}