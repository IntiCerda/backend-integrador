import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForoService } from './foro.service';
import { CreateForoDto } from './dto/create-foro.dto';
import { UpdateForoDto } from './dto/update-foro.dto';
import { Foro } from './entities/foro.entity';

@Controller('foro')
export class ForoController {
  constructor(private readonly foroService: ForoService) {}

  @Post('createForo')
  async create(@Body() createForoDto: CreateForoDto) {
    return this.foroService.create(createForoDto);
  }

  @Get()
  async findAll() {
    return this.foroService.findAll();
  }

  @Get(':id')
  async getForoById(@Param('id') id: string) {
    return this.foroService.getForoById(id);
  }


  @Get(':id/forosProfesor')
  async getForosProfesor(@Param('id') id: string): Promise<Foro[]> {
    return this.foroService.getForosProfesor(id);
  }

  @Get('alumno/:id')
  async getForosDeAlumno(@Param('id') id: string): Promise<Foro[]> {
    return this.foroService.getForosAlumno(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateForoDto: UpdateForoDto) {
    return this.foroService.update(+id, updateForoDto);
  }

  @Delete(':id')
  async removeForo(@Param('id') id: string) {
    return this.foroService.removeForo(id);
  }

  @Patch(':id')
  asignarAsignatura(@Param('id') id: string, @Body() asignatura: string) {
    return this.foroService.asignarAsignatura(id, asignatura);
  }

  
  
}
