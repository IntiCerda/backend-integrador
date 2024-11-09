import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import admin from 'src/firebase.config';
import { Asistencia } from './entities/asistencia.entity';

@Injectable()
export class AsistenciaService {
  private firestoreDb = admin.firestore();

  async create(createAsistenciaDto: CreateAsistenciaDto):Promise <Asistencia> {
    try{
      const docRef = this.firestoreDb.collection('Asistencia').doc();
      await docRef.set(createAsistenciaDto);
      return {
        id: docRef.id,
        ...createAsistenciaDto,
      } as Asistencia;

    }catch(error){
      throw new Error('Error creating asistencia: ' + error.message);
    }
  }

  findAll() {
    return `This action returns all asistencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asistencia`;
  }

  update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    return `This action updates a #${id} asistencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
  }
}