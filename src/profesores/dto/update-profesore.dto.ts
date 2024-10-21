import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesoreDto } from './create-profesore.dto';

export class UpdateProfesoreDto extends PartialType(CreateProfesoreDto) {}
