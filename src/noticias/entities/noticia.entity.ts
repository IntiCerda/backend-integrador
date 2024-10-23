import { IsString, MinLength } from 'class-validator';
export class Noticia {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    cuerpo: string;

    @IsString()
    @MinLength(1)
    emisorId: string;

    @IsString()
    @MinLength(1)
    fecha: string;



}
