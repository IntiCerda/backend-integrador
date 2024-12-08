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
    profesorId: string;

    asignatura: Asignatura;

    @IsString()
    @MinLength(1)
    fecha: string;

    comentarios: ForoComentario[];
    
    constructor() {
        this.comentarios = [];
    }
}
