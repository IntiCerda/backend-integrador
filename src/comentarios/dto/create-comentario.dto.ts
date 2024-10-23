import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateComentarioDto {

    @IsString()
    idForo: string;

    @IsString()
    idEmisor: string;

    @IsString()
    cuerpo: string;

}
