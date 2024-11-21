import {IsString, MinLength } from 'class-validator';

export class Nota {

    @IsString()
    id: string;

    @MinLength(1)
    calificacion: number;

    @IsString()
    @MinLength(1)
    alumnoId: string;

    @IsString()
    asignaturaId: string;

    @IsString()
    @MinLength(1)
    fecha: string;

}
