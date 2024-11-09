import {IsString, MinLength } from 'class-validator';
export class Foro {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsString()
    @MinLength(1)
    profesor: string;

    @IsString()
    @MinLength(1)
    curso: string;

    @IsString()
    @MinLength(1)
    fecha: string;


}
