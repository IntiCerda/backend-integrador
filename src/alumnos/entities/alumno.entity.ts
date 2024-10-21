
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
    course : string;

    @IsString()
    @MinLength(6)
    grades: string;

    @IsString()
    @MinLength(6)
    attendance: string;




}


