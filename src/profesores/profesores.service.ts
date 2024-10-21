import { Injectable } from '@nestjs/common';
import { CreateProfesoreDto } from './dto/create-profesore.dto';
import { UpdateProfesoreDto } from './dto/update-profesore.dto';

@Injectable()
export class ProfesoresService {
  create(createProfesoreDto: CreateProfesoreDto) {
    return 'This action adds a new profesore';
  }

  findAll() {
    return `This action returns all profesores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profesore`;
  }

  update(id: number, updateProfesoreDto: UpdateProfesoreDto) {
    return `This action updates a #${id} profesore`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesore`;
  }
}
