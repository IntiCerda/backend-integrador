import {IsString, MinLength, IsEmail } from 'class-validator';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';

export class Profesore {

    id: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    apellido: string;

    asignaturas : Asignatura[];

    constructor() {
        this.asignaturas = [];
    }
}
