import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoDto } from './create-alumno.dto';

export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {

    nombre?: string;
    apellido?: string;
    fechaNacimiento?: string;
    curso?: string;
    nivel?: string;
    asistencia?: string;
}
