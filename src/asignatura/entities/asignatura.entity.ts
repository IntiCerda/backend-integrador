import { IsEmail, IsString, MinLength } from 'class-validator';
import { Curso } from 'src/cursos/entities/curso.entity';
import { Profesore } from 'src/profesores/entities/profesore.entity';

export class Asignatura {
      
     @IsString()
     id: string;
    
     @IsString()
     @MinLength(1)
     nombre: string;

     @IsString()
     @MinLength(1)
     profesor: Profesore;

     @IsString()
     @MinLength(1)
     curso: Curso;

}
