import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { Nota } from './entities/nota.entity';

@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Post('a')
  async create(@Body() createNotaDto: CreateNotaDto) {
    return this.notasService.create(createNotaDto);
  }

  @Get()
  async getNotasTodosAlumnos(): Promise<{ alumnoId: string; nombre: string; notas: Nota[] }[]> {
    return this.notasService.getNotasTodosAlumnos();
  }
  
  @Get(':id')
  getNotasDeUnAlumno(@Param('id') id: string): Promise<{ asignatura: string; calificacion: number }[]> {
    return this.notasService.getNotasDeUnAlumno(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotaDto: UpdateNotaDto) {
    return this.notasService.update(+id, updateNotaDto);
  }

  @Delete(':id')
  eliminarNota(@Param('id') id: string): Promise<void> {
    return this.notasService.eliminarNota(id);
  }

  @Post('bulk')
  async createBulkNotas(@Body() notas: CreateNotaDto[]) {
    return this.notasService.createBulkNotas(notas);
  }
}
