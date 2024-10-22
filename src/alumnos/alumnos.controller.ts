import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post('createAlumno')
  async create(@Body() createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    return this.alumnosService.create(createAlumnoDto);
  }

  @Get()
  findAll(): Promise<Alumno[]> {
    return this.alumnosService.findAll();
  }

  @Get(':id')
  getAlumnoById(@Param('id') id: string): Promise<Alumno | null> {
    return this.alumnosService.getAlumnoById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnosService.update(+id, updateAlumnoDto);
  }

  @Delete(':id')
  deleteAlumnoById(@Param('id') id: string) {
    return this.alumnosService.deleteAlumnoById(id);
  }
}
