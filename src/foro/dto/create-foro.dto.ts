import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateForoDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsString()
    @MinLength(1)
    profesorId: string;

    @IsString()
    @MinLength(1)
    asignaturaId: string;

    @IsString()
    @MinLength(1)
    fecha: string;

}
