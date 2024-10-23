import { Injectable } from '@nestjs/common';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import admin from 'src/firebase.config';
import { Periodo } from './entities/periodo.entity';

@Injectable()
export class PeriodoService {
  private firestoreDb = admin.firestore();

  async create(createPeriodoDto: CreatePeriodoDto) {
    try{
      const docRef = this.firestoreDb.collection('Periodo').doc();
      await docRef.set(createPeriodoDto);
      return {
        ...createPeriodoDto,
        id: docRef.id,
      } as Periodo;

    }catch(error){
      throw new Error('Error creating periodo: ' + error.message);
    }
  }

  async findAll(): Promise<Periodo[]> {
    try{
      const snapshot = await this.firestoreDb.collection('Periodo').get();
      const periodos = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Periodo;
      });
      return periodos;
    }catch(error){
      throw new Error('Error retrieving periodos');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} periodo`;
  }

  update(id: number, updatePeriodoDto: UpdatePeriodoDto) {
    return `This action updates a #${id} periodo`;
  }

  async eliminarPeriodoById(id: string) {
    try{
      const docRef = this.firestoreDb.collection('Periodo').doc(id);
      const doc = await docRef.get();
      if(!doc.exists){
        return null;
      }
      await docRef.delete();
      return {
        id: doc.id,
        ...doc.data(),
      } as Periodo;
    }catch(error){
      throw new Error('Error deleting periodo: ' + error.message);
    }
  }
}
