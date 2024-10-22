import { Injectable } from '@nestjs/common';
import { CreateForoDto } from './dto/create-foro.dto';
import { UpdateForoDto } from './dto/update-foro.dto';

@Injectable()
export class ForoService {
  create(createForoDto: CreateForoDto) {
    return 'This action adds a new foro';
  }

  findAll() {
    return `This action returns all foro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foro`;
  }

  update(id: number, updateForoDto: UpdateForoDto) {
    return `This action updates a #${id} foro`;
  }

  remove(id: number) {
    return `This action removes a #${id} foro`;
  }
}
