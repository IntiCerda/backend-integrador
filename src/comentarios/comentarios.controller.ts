import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosService.create(createComentarioDto);
  }

  @Get()
  findAll() {
    return this.comentariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(+id);
  }

  @Patch(':id')
  modificarComentario(@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto) {
    return this.comentariosService.modificarComentario(id, updateComentarioDto);
  }

  @Delete(':id')
  eleminarComentarioById(@Param('id') id: string) {
    return this.comentariosService.eleminarComentarioById(id);
  }

  @Get('comentariosForo/:idForo')
  todosComentariosDeUnForo(@Param('idForo') idForo: string) {
    return this.comentariosService.todosComentariosDeUnForo(idForo);
  }

}
