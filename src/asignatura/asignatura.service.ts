import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';
import admin from 'firebase-admin'; 
import { Asignatura } from './entities/asignatura.entity';


@Injectable()
export class AsignaturaService {
  private firestoreDb = admin.firestore();

  async create(createAsignaturaDto: CreateAsignaturaDto) { 
    try {
      const { id, nombre } = createAsignaturaDto;
  
      const docRef = this.firestoreDb.collection('Asignaturas').doc(id);
      await docRef.set(createAsignaturaDto);

  
      return {
        nombre: nombre,
        id: docRef.id,
      } as Asignatura;
  
    } catch (error) {
      throw new Error('Error creating asignatura: ' + error.message);
    }
  }

  async findAll() {
    try{
      const snapshot = await this.firestoreDb.collection('Asignaturas').get();
      const asignaturas = snapshot.docs.map(doc => {
        const data = doc.data();

        return {
          ...data,
          id: doc.id,
        } as Asignatura;

      });
      return asignaturas;

    }catch(error){
      throw new Error('Error retrieving asignaturas');
    }
  }

  async getAsignaturaById(id: string): Promise<Asignatura | null> {
    try{
      const doc = await this.firestoreDb.collection('Asignaturas').doc(id).get();
      if(!doc.exists){
        throw new UnauthorizedException('No such document!');

      }else{
        const data = doc.data();
        return{
          ...data,
          id: doc.id,
        }as Asignatura;
      }
    }catch(error){
      throw new Error('Error getting document');
    }


  }

  update(id: number, updateAsignaturaDto: UpdateAsignaturaDto) { // ver que updatear
    return `This action updates a #${id} asignatura`;
  }

  async removeAsignaturaById(id: string): Promise<Asignatura | null> {
    try{
      const doc = await this.firestoreDb.collection('Asignaturas').doc(id).get();
      if(!doc.exists){
        throw new UnauthorizedException('No such document!');
      }
      const asignaturaData = doc.data() as Asignatura;
      await this.firestoreDb.collection('Asignaturas').doc(id).delete();
      
      return{
        ...asignaturaData,
        id: doc.id,
      } as Asignatura;
    }catch(error){
      throw new Error('Error deleting asignatura');
    }
  }

  //Esto ya no es asi...
  async setAsignaturaToProfesor(asignaturaId: string, profesorId: string): Promise<Asignatura | null> {
    try{
      const asignaturaRef = this.firestoreDb.collection('Asignaturas').doc(asignaturaId);
      const profesorRef = this.firestoreDb.collection('Profesores').doc(profesorId);
      const asignatura = await asignaturaRef.get();
      const profesor = await profesorRef.get();

      if(!asignatura.exists || !profesor.exists){
        throw new UnauthorizedException('No such document!');
      }

      await asignaturaRef.update({profesorId: profesorId});
      return{
        ...asignatura.data(),
        id: asignatura.id,
      } as Asignatura;

      }catch(error){
      throw new Error('Error setting asignatura to profesor');
    }
  }

}
