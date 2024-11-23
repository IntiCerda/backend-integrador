import { Injectable } from '@nestjs/common';
import { CreateProfesoreDto } from './dto/create-profesore.dto';
import { UpdateProfesoreDto } from './dto/update-profesore.dto';
import admin from 'src/firebase.config';
import { Profesore } from './entities/profesore.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';

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
      throw new Error('No such document!');
    }
    const updateData: {[key:string]: any } = {};
    Object.keys(updateProfesoreDto).forEach(key => {
      const value = updateProfesoreDto[key];
      if(value !== undefined){
        updateData[key] = value;
      }
    });

    if(Object.keys(updateData).length === 0){
      throw new Error('No data to update');
    }

    await this.firestoreDb.collection('Profesores').doc(id).update(updateData);
    return {
      ...profesor,
      ...updateData,
    } as Profesore;

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

  async asignarAsignatura(idProfesor: string, idAsignatura: string){
    try{
      const profeRef = this.firestoreDb.collection('Profesores').doc(idProfesor);
      const profeDoc =  await profeRef.get();
      if(!profeDoc.exists){
        throw new Error('No such document!');
      }
      const profeData = {
        id: profeDoc.id,
        ...profeDoc.data(),
      } as Profesore;

      const asignaturaRef = this.firestoreDb.collection('Asignaturas').doc(idAsignatura);
      const asignaturaDoc = await asignaturaRef.get();
      if(!asignaturaDoc.exists){
        throw new Error('No such document!');
      }
      const asignaturaData = {
        id: asignaturaDoc.id,
        ...asignaturaDoc.data(),
      } as Asignatura;

      if(!profeData.asignaturas.some(a => a.id === idAsignatura)){
        profeData.asignaturas.push(asignaturaData);
        await profeRef.update({asignaturas : profeData.asignaturas});
      }
      return {
        ...profeData,
        asignaturas: profeData.asignaturas,
      }

    }catch(error){
      throw new Error('Error asignando asignatura: ' + error.message);
    }
  }

  async getAsignaturasdeUnProfesor(id: string): Promise<Asignatura[]> {
    try {
      const profeRef = this.firestoreDb.collection('Profesores').doc(id);
      const profeDoc = await profeRef.get();
      console.log(profeDoc.data());
      
      if (!profeDoc.exists) {
        throw new Error('No such profesor!');
      }
  
      const asignaturasData = profeDoc.data()?.asignaturas || [];
      const asignaturas: Asignatura[] = [];
  
      for (const asignaturaId of asignaturasData) {
        const asignaturaRef = this.firestoreDb.collection('Asignaturas').doc(asignaturaId);
        const asignaturaDoc = await asignaturaRef.get();
  
        if (asignaturaDoc.exists) {
          asignaturas.push({
            id: asignaturaId,
            nombre: asignaturaDoc.data()?.nombre,
            descripcion: asignaturaDoc.data()?.descripcion,
            profesor: { id: id, ...profeDoc.data() }, 
            curso: asignaturaDoc.data()?.curso, 
          } as Asignatura);
        }
      }
      return asignaturas;
      
    } catch (error) {
      throw new Error('Error retrieving asignaturas: ' + error.message);
    }
  }


}
