import { IsEmail, IsString, MinLength } from 'class-validator';

export class Asignatura {
      
     @IsString()
     id: string;
    
     @IsString()
     @MinLength(1)
     nombre: string;
     
     @IsString()
     @MinLength(1)
     horario?: string;
    
     @IsString()
     @MinLength(1)
     descripcion?: string;
    

}
