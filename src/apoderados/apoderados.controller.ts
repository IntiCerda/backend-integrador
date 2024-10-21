import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApoderadosService } from './apoderados.service';
import { CreateApoderadoDto } from './dto/create-apoderado.dto';
import { UpdateApoderadoDto } from './dto/update-apoderado.dto';

@Controller('apoderados')
export class ApoderadosController {
  constructor(private readonly apoderadosService: ApoderadosService) {}

  @Post()
  create(@Body() createApoderadoDto: CreateApoderadoDto) {
    return this.apoderadosService.create(createApoderadoDto);
  }

  @Get()
  findAll() {
    return this.apoderadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apoderadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApoderadoDto: UpdateApoderadoDto) {
    return this.apoderadosService.update(+id, updateApoderadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apoderadosService.remove(+id);
  }
}
