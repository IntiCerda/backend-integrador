import { IsEmail, IsString, MinLength } from 'class-validator';

export class Asistencia {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    asignaturaId: string;

    @IsString()
    @MinLength(1)
    fecha: string;

    asistencia: boolean;

}
