import {IsString, MinLength } from 'class-validator';
import { Alumno } from 'src/alumnos/entities/alumno.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';

export class Curso {
    id: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    asignaturaId: string;

    @IsString()
    @MinLength(1)
    year: string;

    alumnos: Alumno[];
    
    constructor(){
        this.alumnos = [];
    }

}