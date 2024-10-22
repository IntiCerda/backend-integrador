import { IsEmail, IsString, MinLength } from 'class-validator';

export class Apoderado {

    @IsString()
    id: string;

    @IsString()
    @MinLength(1)
    fullName: string;

    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    password: string;

    alumnos?: string[];

    constructor() {
        this.alumnos = []; 
    }

}
