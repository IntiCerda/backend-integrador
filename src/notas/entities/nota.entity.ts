import {IsString, MinLength } from 'class-validator';

export class Nota {

    @IsString()
    id: string;

    @MinLength(1)
    calificacion: number;

    @IsString()
    @MinLength(1)
    alumno: string;

    @IsString()
    @MinLength(1)
    profesor: string;

    @IsString()
    curso: string;

    @IsString()
    asignatura: string;

    @IsString()
    @MinLength(1)
    fecha: string;

}
