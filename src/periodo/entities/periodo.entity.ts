import {  IsString, MinLength } from 'class-validator';

export class Periodo {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    year: string;
    
}
