import { Module } from '@nestjs/common';
import { ForoService } from './foro.service';
import { ForoController } from './foro.controller';

@Module({
  controllers: [ForoController],
  providers: [ForoService],
})
export class ForoModule {}
