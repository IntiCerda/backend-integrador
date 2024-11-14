import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { CreateProfesoreDto } from './dto/create-profesore.dto';
import { UpdateProfesoreDto } from './dto/update-profesore.dto';
import { Profesore } from './entities/profesore.entity';

@Controller('profesores')
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}

  @Post('createProfesor')
  async create(@Body() createProfesoreDto: CreateProfesoreDto): Promise<Profesore> {
    return this.profesoresService.create(createProfesoreDto);
  }

  @Get()
  findAll(): Promise <Profesore[]> {
    return this.profesoresService.findAll();
  }

  @Get(':id')
  getProfesorById(@Param('id') id: string) {
    return this.profesoresService.getProfesorById(id);
  }

  //Completar esta funcion
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesoreDto: UpdateProfesoreDto) {
    return this.profesoresService.update(id, updateProfesoreDto);
  }

  //Verificar esta func
  @Delete(':id')
  eliminarProfesorById(@Param('id') id: string) {
    return this.profesoresService.eliminarProfesorById(id);
  }
}
