
import {IsString, MinLength } from 'class-validator';

export class Alumno  {
    id: string;

    @IsString()
    @MinLength(1)
    name: string;
  
    @IsString()
    @MinLength(6)
    lastName: string;

    @IsString()
    @MinLength(6)
    curso : string;

    @IsString()
    @MinLength(6)
    nivel: string;

    @IsString()
    @MinLength(6)
    asistencia: string;




}


