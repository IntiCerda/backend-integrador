import {IsString, MinLength } from 'class-validator';

export class Curso {
    id: string;

    @IsString()
    @MinLength(1)
    asignaturaId: string;

    @IsString()
    @MinLength(1)
    year: string;

}
