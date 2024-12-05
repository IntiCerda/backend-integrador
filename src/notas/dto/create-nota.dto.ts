import {IsString, MinLength } from 'class-validator';

export class CreateNotaDto {
    @MinLength(1)
    calificacion: number;

    @IsString()
    @MinLength(1)
    alumnoId: string;

    @IsString()
    cursoId: string;

    @IsString()
    asignaturaId: string;

    @IsString()
    @MinLength(1)
    fecha: string;

}
