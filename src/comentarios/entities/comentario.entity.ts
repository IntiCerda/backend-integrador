import { IsEmail, IsString, MinLength } from 'class-validator';

export class Comentario {

    id: string;

    @IsString()
    idForo: string;

    @IsString()
    idEmisor: string;

    @IsString()
    cuerpo: string;
}
