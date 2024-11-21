import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import admin from 'src/firebase.config';
import { Curso } from './entities/curso.entity';
import { AlumnosService } from 'src/alumnos/alumnos.service';
import { Alumno } from 'src/alumnos/entities/alumno.entity';

@Injectable()
export class CursosService {
  private firebaseDb = admin.firestore();
  private alumnosService: AlumnosService

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    try{
      const docRef = this.firebaseDb.collection('Cursos').doc();
      await docRef.set(createCursoDto);
      return {
        ...createCursoDto,
        id: docRef.id,
      } as Curso;
    }catch(error){
      throw new Error('Error creating curso: ' + error.message);
    }
  }

  async findAll(): Promise<Curso[]> {
    try{
      const snapshot = await this.firebaseDb.collection('Cursos').get();
      const cursos = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Curso;
      });
      return cursos;
    }catch(error){
      throw new Error('Error retrieving cursos');
    }
  }

  async getCursoById(id: string): Promise<Curso | null> {
    try{
      const doc = await this.firebaseDb.collection('Cursos').doc(id).get();
      if(!doc.exists){
        throw new Error('No such document!');
      }
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
      } as Curso;
    }catch(error){
      throw new Error('Error retrieving curso: ' + error.message);
    }

  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return `This action updates a #${id} curso`;
  }

  async eliminarCurso(id: string) {
    try{
      const docRef = this.firebaseDb.collection('Cursos').doc(id);
      const doc = await docRef.get();
      if(!doc.exists){
        throw new Error('No such document!');
    }
      docRef.delete();
      return true;
    }catch(error){
      throw new Error('Error deleting curso: ' + error.message);
    }
  }

  async addAlumnoToCurso(cursoId: string, alumnoId: string): Promise<Curso | null> {
    try {
      // Obtener la referencia del curso
      const cursoRef = this.firebaseDb.collection('Cursos').doc(cursoId);
      const cursoDoc = await cursoRef.get();
  
      if (!cursoDoc.exists) {
        console.log('No such curso!');
        return null;
      }
  
      const cursoData = {
        id: cursoDoc.id,
        ...cursoDoc.data(),
      } as Curso;
  
      const alumnoRef = this.firebaseDb.collection('Alumnos').doc(alumnoId);
      const alumnoDoc = await alumnoRef.get();
      
      if (!alumnoDoc.exists) {
        console.log('No such alumno!');
        return null;
      }
  
      if (!Array.isArray(cursoData.alumnos)) {
        cursoData.alumnos = []; 
      }
  
      const nuevoAlumno = {
        id: alumnoId,
        nombre: alumnoDoc.data()?.nombre,
        apellido: alumnoDoc.data()?.apellido,
      } as Alumno;
  
      if (!cursoData.alumnos.some(a => a.id === alumnoId)) {
        cursoData.alumnos.push(nuevoAlumno);
  
        await cursoRef.update({ alumnos: cursoData.alumnos });
      } else {
        console.log('Alumno is already associated with this curso.');
      }
      
      return {
        ...cursoData,
        alumnos: cursoData.alumnos,
      };
  
    } catch (error) {
      throw new Error('Error adding alumno to curso: ' + error.message);
    }
  }
  
  async getAlumnosByCursoId(id: string) {
    try{
      const snapshot = await this.firebaseDb.collection('Cursos').doc(id).collection('Alumnos').get();
      const alumnos = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        }as Alumno;
      });
      return alumnos;
    }catch(error){
      throw new Error('Error retrieving alumnos');
    }
  }

}
