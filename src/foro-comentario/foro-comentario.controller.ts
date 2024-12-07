import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForoComentarioService } from './foro-comentario.service';
import { CreateForoComentarioDto } from './dto/create-foro-comentario.dto';
import { UpdateForoComentarioDto } from './dto/update-foro-comentario.dto';

@Controller('foro-comentario')
export class ForoComentarioController {
  constructor(private readonly foroComentarioService: ForoComentarioService) {}

  @Post()
  async crearComentario(@Body() createForoComentarioDto: CreateForoComentarioDto) {
    return this.foroComentarioService.crearComentario(createForoComentarioDto);
  }

  @Get()
  findAll() {
    return this.foroComentarioService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.foroComentarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForoComentarioDto: UpdateForoComentarioDto) {
    return this.foroComentarioService.update(id, updateForoComentarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foroComentarioService.remove(id);
  }
}
