import { IsEmail, IsString, MinLength } from 'class-validator';

export class Asistencia {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    curso: string;

    @IsString()
    @MinLength(1)
    fecha: string;




}
