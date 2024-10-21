import { Injectable } from '@nestjs/common';
import { CreateApoderadoDto } from './dto/create-apoderado.dto';
import { UpdateApoderadoDto } from './dto/update-apoderado.dto';

@Injectable()
export class ApoderadosService {
  create(createApoderadoDto: CreateApoderadoDto) {
    return 'This action adds a new apoderado';
  }

  findAll() {
    return `This action returns all apoderados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apoderado`;
  }

  update(id: number, updateApoderadoDto: UpdateApoderadoDto) {
    return `This action updates a #${id} apoderado`;
  }

  remove(id: number) {
    return `This action removes a #${id} apoderado`;
  }
}
