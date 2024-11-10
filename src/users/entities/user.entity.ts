import { IsEmail, IsString, MinLength } from 'class-validator';

export class User {
    @IsString()
    @MinLength(1)
    nombre: string;
  
    @IsString()
    @MinLength(6)
    apellido: string;
  
    @IsEmail()
    rol: string;
  
    @IsString()
    @MinLength(6)
    uid: string;

}
