import { IsString, MinLength } from "class-validator";

export class ForoComentario {

    @IsString()
    @MinLength(1)
    comentario: string;

    @IsString()
    @MinLength(1)
    foroId: string;

    @IsString()
    @MinLength(1)
    userId: string; //Quien va a comentar en el foro? Alumnos o Apoderados?

    @IsString()
    @MinLength(1)
    fecha: string;

}
