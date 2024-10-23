import { IsString, MinLength } from "class-validator";


export class CreateAsistenciaDto {
    @IsString()
    @MinLength(1)
    curso: string;

    @IsString()
    @MinLength(1)
    fecha: string;


}
