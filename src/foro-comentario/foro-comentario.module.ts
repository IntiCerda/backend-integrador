import { Module } from '@nestjs/common';
import { ForoComentarioService } from './foro-comentario.service';
import { ForoComentarioController } from './foro-comentario.controller';

@Module({
  controllers: [ForoComentarioController],
  providers: [ForoComentarioService],
})
export class ForoComentarioModule {}
