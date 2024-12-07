import { PartialType } from '@nestjs/mapped-types';
import { CreateForoComentarioDto } from './create-foro-comentario.dto';

export class UpdateForoComentarioDto extends PartialType(CreateForoComentarioDto) {}
