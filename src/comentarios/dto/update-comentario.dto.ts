import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioDto } from './create-comentario.dto';
import { IsString } from 'class-validator';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {

    @IsString()
    cuerpoNuevo: string;


}
