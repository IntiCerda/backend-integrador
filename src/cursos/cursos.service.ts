import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import admin from 'src/firebase.config';
import { Curso } from './entities/curso.entity';

@Injectable()
export class CursosService {
  private firebaseDb = admin.firestore();

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
}
