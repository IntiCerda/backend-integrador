import { IsEmail, IsString, MinLength } from 'class-validator';
import { Alumno } from 'src/alumnos/entities/alumno.entity';

export class Apoderado {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    apellido: string;



    alumnos?: Alumno[];

    constructor() {
        this.alumnos = []; 
    }

}
