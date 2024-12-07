import {IsString, MinLength } from 'class-validator';

export class CreateForoComentarioDto {
    
        @IsString()
        @MinLength(1)
        comentario: string;
    
        @IsString()
        @MinLength(1)
        foroId: string;
    
        @IsString()
        @MinLength(1)
        userId: string;
    
        @IsString()
        @MinLength(1)
        fecha: string;

}
