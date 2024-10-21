import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import admin from 'firebase-admin'; 
import { Alumno } from './entities/alumno.entity';


@Injectable()
export class AlumnosService {
  private firestoreDb = admin.firestore();

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    try{
      const docRef = await this.firestoreDb.collection('Alumnos').add(createAlumnoDto);
      console.log('Data created with ID: ', docRef.id);

      return {
        ...createAlumnoDto,
        id: docRef.id,
      } as Alumno;

    }catch(error){
      throw new Error('Error creating alumno');
    }

  }

  async findAll():Promise<Alumno[]> {
    try{
      const snapshot = await this.firestoreDb.collection('Alumnos').get();
      const alumnos = snapshot.docs.map(doc => {
        const data = doc.data();
        return{
          ...data,
          id: doc.id,
        } as Alumno;
      });
      return alumnos;
      
    }catch(error){
      throw new Error('Error retrieving alumnos');
    }
  }

  async getAlumnoById(id: string): Promise<Alumno | null> {
    try {
      const doc = await this.firestoreDb.collection('Alumnos').doc(id.toString()).get();
      if (!doc.exists) {
        throw new UnauthorizedException('No such document!');
      } else {
        const data = doc.data(); 
        return {
          ...data,
          id: doc.id, 
        } as Alumno;
      }
    } catch (error) {
      throw new Error('Error getting document');
    }
  }

  update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    return `This action updates a #${id} alumno`;
  }

  async deleteAlumnoById(id: string): Promise<Alumno | null> {
    try {
      const doc = await this.firestoreDb.collection('Alumnos').doc(id).get();
      if (!doc.exists) {
        throw new UnauthorizedException('No such document!'); 
      }
      const alumnoData = doc.data() as Alumno;
      await this.firestoreDb.collection('Alumnos').doc(id).delete();
  
      return {
        ...alumnoData,
        id: doc.id, 
      };
    } catch (error) {
      console.error('Error removing document:', error);
      throw new Error('Error removing document');
    }
  }
}
