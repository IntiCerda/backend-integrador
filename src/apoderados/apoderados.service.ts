import { Injectable } from '@nestjs/common';
import { CreateApoderadoDto } from './dto/create-apoderado.dto';
import { UpdateApoderadoDto } from './dto/update-apoderado.dto';
import admin from 'firebase-admin'; 
import { Apoderado } from './entities/apoderado.entity';
import { Alumno } from 'src/alumnos/entities/alumno.entity';

@Injectable()
export class ApoderadosService {
  private firestoreDb = admin.firestore();

  async create(createApoderadoDto: CreateApoderadoDto): Promise<Apoderado> {
    try {
      const { id, ...data } = createApoderadoDto;

      const docRef = this.firestoreDb.collection('Apoderados').doc(id);
      await docRef.set(data);

      return {
        ...data,
        id: id, 
      } as Apoderado;
  
    } catch (error) {
      throw new Error('Error creating apoderado: ' + error.message);
    }
  }

  async findAll(): Promise<Apoderado[]> {
    try{
      const snapshot = await this.firestoreDb.collection('Apoderados').get();
      const apoderados = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Apoderado;
      });
      return apoderados;
      }catch(error){
        throw new Error('Error retrieving apoderados');
      }
  }

  async getApoderadoById(id: string): Promise<Apoderado | null> {
    try {
      const docRef = this.firestoreDb.collection('Apoderados').doc(id);
      const doc = await docRef.get();
  
      if (!doc.exists) {
        console.log('No such document!');
        return null;
      }
      
      return {
        id: doc.id, 
        ...doc.data(), 
      } as Apoderado;
  
    } catch (error) {
      throw new Error('Error getting apoderado: ' + error.message);
    }
  }

  update(id: number, updateApoderadoDto: UpdateApoderadoDto) { 
    return `This action updates a #${id} apoderado`;
  }

  async eliminarApoderadoById(id: string): Promise<Apoderado | null> {
    try {
      const docRef = this.firestoreDb.collection('Apoderados').doc(id);
      const doc = await docRef.get();
  
      if (!doc.exists) {
        console.log('No such document!');
        return null; 
      }
      const apoderadoData = {
        id: doc.id,
        ...doc.data(), 
      } as Apoderado;

      await docRef.delete();
      console.log('Document successfully deleted!');
      return apoderadoData; 

    } catch (error) {
      throw new Error('Error removing apoderado: ' + error.message);
    }
  }

  async addAlumnoToApoderado(apoderadoId: string, alumnoId: string): Promise<Apoderado | null> {
    try {
      const apoderadoRef = this.firestoreDb.collection('Apoderados').doc(apoderadoId);
      const apoderadoDoc = await apoderadoRef.get();

      if (!apoderadoDoc.exists) {
        console.log('No such apoderado!');
        return null;
      }

      const apoderadoData = {
        id: apoderadoDoc.id,
        ...apoderadoDoc.data(),
      } as Apoderado;

      const alumnoRef = this.firestoreDb.collection('Alumnos').doc(alumnoId);
      const alumnoDoc = await alumnoRef.get();

      if (!alumnoDoc.exists) {
        console.log('No such alumno!');
        return null;
      }

      if (!apoderadoData.alumnos) {
        apoderadoData.alumnos = []; 
      }

      if (!apoderadoData.alumnos.includes(alumnoId)) {
        apoderadoData.alumnos.push(alumnoId); 
      }

      await apoderadoRef.update({ alumnos: apoderadoData.alumnos });

      console.log('Alumno added to apoderado:', apoderadoId);

      return {
        ...apoderadoData,
        alumnos: apoderadoData.alumnos, 
      };

    } catch (error) {
      throw new Error('Error adding alumno to apoderado: ' + error.message);
    }
  }


  async getAlumnosToApoderado(apoderadoId: string): Promise<Alumno[] | null> {
    try {
      const apoderadoRef = this.firestoreDb.collection('Apoderados').doc(apoderadoId);
      const apoderadoDoc = await apoderadoRef.get();

      if (!apoderadoDoc.exists) {
        console.log('No such apoderado!');
        return null;
      }

      const apoderadoData = {
        id: apoderadoDoc.id,
        ...apoderadoDoc.data(),
      } as Apoderado;

      const alumnos: Alumno[] = [];

      if (apoderadoData.alumnos) {
        for (const alumnoId of apoderadoData.alumnos) {
          const alumnoRef = this.firestoreDb.collection('Alumnos').doc(alumnoId);
          const alumnoDoc = await alumnoRef.get();

          if (alumnoDoc.exists) {
            const alumnoData = {
              id: alumnoDoc.id,
              ...alumnoDoc.data(),
            } as Alumno;
            alumnos.push(alumnoData);
          }
        }
      }

      return alumnos; 

    } catch (error) {
      throw new Error('Error getting alumnos for apoderado: ' + error.message);
    }
  }

}
