import {IsString, MinLength } from 'class-validator';

export class CreateAsignaturaDto {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    nombre: string;
   

}
