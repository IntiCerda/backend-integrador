import { IsString, MinLength } from "class-validator";


export class CreateAlumnoDto {

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


}
