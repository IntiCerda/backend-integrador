import { IsString, MinLength } from 'class-validator';

export class CreateNoticiaDto {

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
