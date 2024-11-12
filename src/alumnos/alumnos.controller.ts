import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Controller('alumnos')
export class AlumnosController {
  constructor(
    private readonly alumnosService: AlumnosService) {}

  @Post('createAlumno')
  async create(@Body() createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    return this.alumnosService.create(createAlumnoDto);
  }

  @Get()
  findAll(): Promise<{ id: string; nombre: string; apoderadoNombre: string | null }[]> {
    return this.alumnosService.findAll();
  }

  @Get(':id')
  getAlumnoById(@Param('id') id: string): Promise<Alumno | null> {
    return this.alumnosService.getAlumnoById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return await this.alumnosService.update(id, updateAlumnoDto);
  }

  @Delete(':id')
  deleteAlumnoById(@Param('id') id: string) {
    return this.alumnosService.deleteAlumnoById(id);
  }

  @Post('associate')
  async associateAlumnosWithApoderados(): Promise<string> {
    try {
      await this.alumnosService.associateAlumnosWithApoderados();
      return 'Alumnos asociados con apoderados correctamente.';
    } catch (error) {
      // Manejo de errores en caso de que ocurra algún problema
      console.error(error);
      throw new Error('Error al asociar alumnos con apoderados.');
    }
  }

}
