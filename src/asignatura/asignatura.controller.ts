import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';
import { Asignatura } from './entities/asignatura.entity';

@Controller('asignatura')
export class AsignaturaController {
  constructor(private readonly asignaturaService: AsignaturaService) {}

  @Post('createAsignatura')
  async create(@Body() createAsignaturaDto: CreateAsignaturaDto): Promise<Asignatura> {
    return this.asignaturaService.create(createAsignaturaDto);
  }

  @Get()
  findAll() {
    return this.asignaturaService.findAll();
  }

  @Get(':id')
  getAsignaturaById(@Param('id') id: string) {
    return this.asignaturaService.getAsignaturaById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsignaturaDto: UpdateAsignaturaDto) {
    return this.asignaturaService.update(+id, updateAsignaturaDto);
  }

  @Delete(':id')
  removeAsignaturaById(@Param('id') id: string) {
    return this.asignaturaService.removeAsignaturaById(id);
  }

  @Post('addProfesorToAsignatura')
  async setAsignaturaToProfesor(@Body('asignaturaId') asignaturaId: string, @Body('profesorId') profesorId: string)
  : Promise<Asignatura | null> {
    return this.asignaturaService.setAsignaturaToProfesor(asignaturaId, profesorId);
  }
}
