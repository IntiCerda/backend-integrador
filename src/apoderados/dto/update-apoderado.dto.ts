import { PartialType } from '@nestjs/mapped-types';
import { CreateApoderadoDto } from './create-apoderado.dto';

export class UpdateApoderadoDto extends PartialType(CreateApoderadoDto) {
    id: string;
    nombre?: string;
    apellido?: string;

}
