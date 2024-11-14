import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApoderadosService } from './apoderados.service';
import { CreateApoderadoDto } from './dto/create-apoderado.dto';
import { UpdateApoderadoDto } from './dto/update-apoderado.dto';
import { Apoderado } from './entities/apoderado.entity';
import { Alumno } from 'src/alumnos/entities/alumno.entity';

@Controller('apoderados')
export class ApoderadosController {

  constructor(
    private readonly apoderadosService: ApoderadosService) {}

  @Post('createApoderado')
  async create(@Body() createApoderadoDto: CreateApoderadoDto): Promise<Apoderado> {
    return this.apoderadosService.create(createApoderadoDto);
  }

  @Get()
  async findAll(): Promise<Apoderado[]> {
    return this.apoderadosService.findAll();
  }

  @Get(':id')
  getApoderadoById(@Param('id') id: string): Promise<Apoderado | null> {
    return this.apoderadosService.getApoderadoById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApoderadoDto: UpdateApoderadoDto) {
    return this.apoderadosService.update(id, updateApoderadoDto);
  }

  @Delete(':id')
  eliminarApoderadoById(@Param('id') id: string) {
    return this.apoderadosService.eliminarApoderadoById(id);
  }

  @Post('addAlumno')
  async addAlumnoToApoderado(@Body('apoderadoId') apoderadoId: string, @Body('alumnoId') alumnoId: string)
  : Promise<Apoderado | null> {
    return this.apoderadosService.addAlumnoToApoderado(apoderadoId, alumnoId);
  }

  @Get('alumnos/:id')
  async getAlumnosToApoderado(@Param('id') apoderadoId: string): Promise<Alumno[] | null> {
    return this.apoderadosService.getAlumnosToApoderado(apoderadoId);
  }

}
