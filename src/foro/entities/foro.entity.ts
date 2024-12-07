import {IsString, MinLength } from 'class-validator';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { ForoComentario } from 'src/foro-comentario/entities/foro-comentario.entity';
export class Foro {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsString()
    @MinLength(1)
    profesor: string;

    @IsString()
    @MinLength(1)
    curso: string;

    @IsString()
    @MinLength(1)
    fecha: string;

    asignaturas : Asignatura[];
    comentarios: ForoComentario[];
    
    constructor() {
        this.asignaturas = [];
        this.comentarios = [];
    }
}
