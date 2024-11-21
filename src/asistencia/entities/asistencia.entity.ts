import { IsEmail, IsString, MinLength } from 'class-validator';

export class Asistencia {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    cursoId: string;

    @IsString()
    @MinLength(1)
    fecha: string;

    asistencia: boolean;

}
