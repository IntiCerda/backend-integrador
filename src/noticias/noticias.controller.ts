import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  create(@Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiasService.create(createNoticiaDto);
  }

  @Get()
  findAll() {
    return this.noticiasService.findAll();
  }

  @Get(':id')
  getNoticeById(@Param('id') id: string) {
    return this.noticiasService.getNoticeById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticiaDto: UpdateNoticiaDto) {
    return this.noticiasService.update(+id, updateNoticiaDto);
  }

  @Delete(':id')
  eliminarNoticeById(@Param('id') id: string) {
    return this.noticiasService.eliminarNoticeById(id);
  }
}
