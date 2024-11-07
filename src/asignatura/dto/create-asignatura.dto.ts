import {IsString, MinLength } from 'class-validator';

export class CreateAsignaturaDto {

    @IsString()
    @MinLength(1)
    nombre: string;
   
    @IsString()
    @MinLength(1)
    profesorId: string;

}
