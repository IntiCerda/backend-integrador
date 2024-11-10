import { IsEmail, IsString, MinLength } from 'class-validator';

export class Apoderado {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    apellido: string;



    alumnos?: string[];

    constructor() {
        this.alumnos = []; 
    }

}
