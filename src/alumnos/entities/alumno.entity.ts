
import {IsString, MinLength } from 'class-validator';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';
import { Nota } from 'src/notas/entities/nota.entity';

export class Alumno  {
    id: string;

    @IsString()
    @MinLength(1)
    nombre: string;
  
    @IsString()
    @MinLength(6)
    apellido: string;

    @IsString()
    @MinLength(1)
    rut: string;

    @IsString()
    @MinLength(1)
    fechaNacimiento: string;

    @IsString()
    @MinLength(1)
    apoderadoId: string;

    @IsString()
    @MinLength(6)
    curso : string;

    asistencia: Asistencia[];
    notas : Nota[];

    constructor(){
        this.asistencia = [];
        this.notas = [];
    }



}


