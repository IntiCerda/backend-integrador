import {IsString, MinLength } from 'class-validator';
import { Alumno } from 'src/alumnos/entities/alumno.entity';

export class CreateCursoDto {

    @IsString()
    @MinLength(1)
    asignaturaId: string;

    @IsString()
    @MinLength(1)
    year: string;

    
}
