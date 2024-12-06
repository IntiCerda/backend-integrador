import { IsString } from "class-validator";


export class CreateAsistenciaDto {
    @IsString()
    asignaturaId: string;

    @IsString()
    alumnoId: string;

    @IsString()
    fecha: string;

    asistencia: boolean;
}
