import { IsString, MinLength } from "class-validator";


export class CreateAlumnoDto {

    @IsString()
    @MinLength(1)
    name: string;
  
    @IsString()
    @MinLength(6)
    lastName: string;

    @IsString()
    @MinLength(6)
    curso : string;


}
