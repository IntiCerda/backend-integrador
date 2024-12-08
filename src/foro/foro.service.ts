import { Injectable } from '@nestjs/common';
import { CreateForoDto } from './dto/create-foro.dto';
import { UpdateForoDto } from './dto/update-foro.dto';
import admin from 'firebase-admin'; 
import { Foro } from './entities/foro.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { ForoComentario } from 'src/foro-comentario/entities/foro-comentario.entity';

@Injectable()
export class ForoService {
  private firestoreDb = admin.firestore();

  async create(createForoDto: CreateForoDto): Promise<Foro> {
    try {
      const { title, description, profesorId, asignaturaId, fecha } = createForoDto;
  
      const profesorExiste = await this.firestoreDb.collection('Profesores').doc(profesorId).get();
      if (!profesorExiste.exists) {
        throw new Error('Profesor does not exist');
      }
  
      const asignaturaSnapshot = await this.firestoreDb.collection('Asignaturas').doc(asignaturaId).get();
      if (!asignaturaSnapshot.exists) {
        throw new Error('Asignatura does not exist');
      }
  
      const data = {
        title: title,
        description: description,
        profesorId: profesorId, 
        asignatura: asignaturaSnapshot.data() as Asignatura,
        fecha: fecha,
        comentarios: [] as ForoComentario[],
      };
      console.log('data:', data);

      const docRef = this.firestoreDb.collection('Foro').doc();
      await docRef.set(data);
      

      return {
        title: title,
        description: description,
        profesor: profesorId,
        asignatura: asignaturaSnapshot.data() as Asignatura,
        fecha: fecha,
        id: docRef.id,
        profesorId: profesorId,
        comentarios: [] as ForoComentario[],
      } as Foro;
  
    } catch (error) {
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
          comentarios: data.comentarios || [],
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

  async asociarComentario(id: string, comentarioId: string): Promise<boolean> {
    try {
      const foroRef = this.firestoreDb.collection('Foro').doc(id);
      const foroDoc = await foroRef.get();
  
      if (!foroDoc.exists) {
        throw new Error('Foro does not exist');
      }
  
      const comentarioRef = this.firestoreDb.collection('ForoComentario').doc(comentarioId);
      const comentarioDoc = await comentarioRef.get();
  
      if (!comentarioDoc.exists) {
        throw new Error('Comentario does not exist');
      }
  
      const comentarioData = {
        ...comentarioDoc.data(),
      } as ForoComentario; 
  
      if (!foroDoc.data().comentarios.some(a => a.id === comentarioId)) {
        const comentariosActuales = foroDoc.data().comentarios || [];
        comentariosActuales.push(comentarioData);
        await foroRef.update({ comentarios: comentariosActuales });
      }
  
      return true; 
  
    } catch (error) {
      console.error('Error asociando comentario:', error.message);
      return false; 
    }
  }


  async getForosProfesor(id: string): Promise<Foro[]> {
    try {
      const profesorId = id;

      const profesorRef = this.firestoreDb.collection('Profesores').doc(id);
      const profesorDoc = await profesorRef.get();
  
      if (!profesorDoc.exists) {
        throw new Error('Profesor does not exist');
      }
  
      const forosRef = this.firestoreDb.collection('Foro').where('profesorId', '==', profesorId);
      const forosSnapshot = await forosRef.get();
  
      const foros: Foro[] = forosSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          comentarios: data.comentarios || [],
          id: doc.id,
        } as Foro;
      });
  
      return foros;
  
    } catch (error) {
      console.error('Error getting foros profesor:', error.message);
      return []; 
    }
  }

  async getForosCurso(id: string): Promise<Foro[]> {
    try {
      const cursoRef = this.firestoreDb.collection('Cursos').doc(id);
      const cursoDoc = await cursoRef.get();
  
      if (!cursoDoc.exists) {
        throw new Error('Curso does not exist');
      }
  
      const cursoData = cursoDoc.data();
      const cursoId = cursoData?.id || cursoDoc.id; 
  
      const forosRef = this.firestoreDb.collection('Foro').where('curso', '==', cursoId);
      const forosSnapshot = await forosRef.get();
  
      const foros: Foro[] = forosSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          comentarios: data.comentarios || [],
          id: doc.id,
        } as Foro;
      });
  
      return foros;
  
    } catch (error) {
      console.error('Error getting foros curso:', error.message);
      return []; 
    }
  }


}
