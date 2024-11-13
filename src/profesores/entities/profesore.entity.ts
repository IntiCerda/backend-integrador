import {IsString, MinLength, IsEmail } from 'class-validator';

export class Profesore {

    id: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    apellido: string;



}
