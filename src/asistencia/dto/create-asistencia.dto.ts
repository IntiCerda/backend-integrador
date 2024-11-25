import { IsString } from "class-validator";


export class CreateAsistenciaDto {
    @IsString()
    cursoId: string;

    @IsString()
    alumnoId: string;

    @IsString()
    fecha: string;

    asistencia: boolean;
}
