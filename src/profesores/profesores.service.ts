import { Injectable } from '@nestjs/common';
import { CreateProfesoreDto } from './dto/create-profesore.dto';
import { UpdateProfesoreDto } from './dto/update-profesore.dto';
import admin from 'src/firebase.config';
import { Profesore } from './entities/profesore.entity';

@Injectable()
export class ProfesoresService {
  private firestoreDb = admin.firestore();
  
  async create(createProfesoreDto: CreateProfesoreDto) {
    try{
      const { id, ...data } = createProfesoreDto;
      const docRef = this.firestoreDb.collection('Profesores').doc(id);
      await docRef.set(data);
      return {
        ...data,
        id: id,
      }as Profesore;

    }catch(error){
      throw new Error('Error creating profesor: ' + error.message);
    }
  }

  async findAll(): Promise <Profesore[]> {
    try{
      const snapshot = await this.firestoreDb.collection('Profesores').get();
      const profesores = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Profesore;
      });
      return profesores;

    }catch(error){
      throw new Error('Error retrieving profesores');
    }
  }
  
  async getProfesorById(id: string): Promise<Profesore | null> {
    try{
      const docRef = this.firestoreDb.collection('Profesores').doc(id);
      const doc = await docRef.get();

      if(!doc.exists){
        console.log('No such document!');
        return null;
      }
      return {
        id: doc.id,
        ...doc.data(),
      } as Profesore;

    }catch(error){
      throw new Error('Error retrieving profesor: ' + error.message);
    }
  }

  async update(id: string, updateProfesoreDto: UpdateProfesoreDto) {
    const profesor = await this.getProfesorById(id);
    if(!profesor){
      throw new Error('Profesor not found');
    }
    const updateData: {[key: string]: any} = {};
    Object.keys(updateProfesoreDto).forEach(key => {
      const value = updateProfesoreDto[key];
      if(value !== undefined && value !== ""){
        updateData[key] = value;
      }
    });
    if(Object.keys(updateData).length === 0){
      throw new Error('No data to update');
    }
    await this.firestoreDb.collection('Profesores').doc(id).update(updateData);
  }

  async eliminarProfesorById(id: string) {
    try{
      const docRef = this.firestoreDb.collection('Profesores').doc(id);
      const doc = await docRef.get();

      if(!doc.exists){
        console.log('No such document!');
        return null;
      }

      const profesorData = {
        id: doc.id,
        ...doc.data(),
      } as Profesore
      await docRef.delete();
      return profesorData;

    }catch(error){
      throw new Error('Error eliminando profesor: ' + error.message);
    }

  }
}
