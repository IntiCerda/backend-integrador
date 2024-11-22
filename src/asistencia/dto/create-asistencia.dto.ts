import { IsString, MinLength } from "class-validator";


export class CreateAsistenciaDto {
    @IsString()
    @MinLength(1)
    cursoId: string;

    @IsString()
    @MinLength(1)
    fecha: string;

    asistencia: boolean;

}
