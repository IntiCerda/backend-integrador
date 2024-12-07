import { Module, forwardRef } from '@nestjs/common';
import { ForoComentarioService } from './foro-comentario.service';
import { ForoComentarioController } from './foro-comentario.controller';
import { ForoModule } from '../foro/foro.module';

@Module({
  imports: [forwardRef(() => ForoModule)],
  providers: [ForoComentarioService],
  controllers: [ForoComentarioController],
  exports: [ForoComentarioService],
})
export class ForoComentarioModule {}