import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  findAll(): Promise<Curso[]> {
    return this.cursosService.findAll();
  }

  @Get(':id')
  async getCursoById(@Param('id') id: string) { //Necesitamos esto? IDK
    return this.cursosService.getCursoById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursosService.update(+id, updateCursoDto);
  }

  @Delete(':id')
  eliminarCurso(@Param('id') id: string) {
    return this.cursosService.eliminarCurso(id);
  }

  @Post("addAlumnoACurso")
  async addAlumnoToCurso(@Body('cursoId') cursoId: string, @Body('alumnoId') alumnoId: string) {
    return this.cursosService.addAlumnoToCurso(cursoId, alumnoId);
  }
  

}
