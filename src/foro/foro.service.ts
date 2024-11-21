import { Injectable } from '@nestjs/common';
import { CreateForoDto } from './dto/create-foro.dto';
import { UpdateForoDto } from './dto/update-foro.dto';
import admin from 'firebase-admin'; 
import { Foro } from './entities/foro.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';

@Injectable()
export class ForoService {
  private firestoreDb = admin.firestore();


  async create(createForoDto: CreateForoDto):Promise<Foro> {
    try {
      const {title, description, profesorId, cursoId, fecha } = createForoDto;

      const profesorExiste = await this.firestoreDb.collection('Profesores').doc(profesorId).get();
      if(!profesorExiste.exists){
        throw new Error('Profesor does not exist');
      }

      const cursoExiste = await this.firestoreDb.collection('Cursos').doc(cursoId).get();
      if(!cursoExiste.exists){
        throw new Error('Curso does not exist');
      }

      const data = {
        title : title,
        description : description,
        profesor : profesorExiste.data().nombre,
        curso : cursoExiste.data().nombre,
        fecha : fecha
      } 

      const docRef = this.firestoreDb.collection('Foro').doc();
      await docRef.set(data);
      
      return{
        title : title,
        description : description,
        profesor : profesorExiste.data().nombre,
        curso : cursoExiste.data().nombre,
        fecha : fecha,
        id: docRef.id,
      }as Foro;

    }catch(error){
      throw new Error('Error creating foro: ' + error.message);
    }
  }

  async findAll():Promise<Foro[]> {
    try{
      const snapshot = await this.firestoreDb.collection('Foro').get();
      const foros = snapshot.docs.map(doc => {
        const data = doc.data();
        return{
          ...data,
          id: doc.id,
        }as Foro;
      });
      return foros;
    }catch(error){
      throw new Error('Error retrieving foros');
    }
  }

  async getForoById(id: string): Promise<Foro | null> {
    try{
      const docRef = this.firestoreDb.collection('Foro').doc(id);
      const doc = await docRef.get();

      if(!doc.exists){
        console.log('No such document!');
        return null;
      }

      return{
        id: doc.id,
        ...doc.data(),
      }as Foro;
    }catch(error){
      throw new Error('Error retrieving foro: ' + error.message);
    }
  }

  update(id: number, updateForoDto: UpdateForoDto) {
    return `This action updates a #${id} foro`;
  }

  async removeForo(id: string):Promise<Foro> {
    try{
      const docRef = this.firestoreDb.collection('Foro').doc(id);
      const doc = await docRef.get();
      if(!doc.exists){
        console.log('No such document!');
        return null;
      }
      docRef.delete();
      return{
        id: id,
        ...doc.data(),
      }as Foro;
    }catch(error){
      throw new Error('Error deleting foro: ' + error.message);
    }
  }

  async asignarAsignatura(id: string, asignaturaId: string):Promise<Foro> {
    try{
      const foroExiste = await this.firestoreDb.collection('Foro').doc(id).get();
      if(!foroExiste.exists){
        throw new Error('Foro does not exist');
      }

      const asignaturaExiste = await this.firestoreDb.collection('Asignaturas').doc(asignaturaId).get();
      if(!asignaturaExiste.exists){
        throw new Error('Asignatura does not exist');
      }

      const asignaturaData = {
        id: asignaturaExiste.id,
        ...asignaturaExiste.data(),
      } as Asignatura;

      if(!foroExiste.data().asignaturas.some(a => a.id === asignaturaId)){
        foroExiste.data().asignaturas.push(asignaturaData);
        await this.firestoreDb.collection('Foro').doc(id).update({asignaturas : asignaturaData});
      }
      return{
        ...foroExiste.data(),
        id: id,
      }as Foro;

    }catch(error){
      throw new Error('Error asigning asignatura: ' + error.message);
    }
  }

}
