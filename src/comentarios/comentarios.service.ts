import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import admin from 'src/firebase.config';
import { Comentario } from './entities/comentario.entity';

@Injectable()
export class ComentariosService {
  private firestoreDb = admin.firestore(); 

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    try{ //verificar emisor y foro existan.

      const foroRef = this.firestoreDb.collection('Foros').doc(createComentarioDto.idForo);
      await foroRef.get().then((doc) => {
        if (!doc.exists) {
          throw new Error('Foro no existe');
        }
      });

      const docRef = this.firestoreDb.collection('Comentarios').doc();
      await docRef.set(createComentarioDto);
      return {
        id: docRef.id,
        ...createComentarioDto,
      } as Comentario;
    }catch(error){
      throw new Error('Error creando comentario');
    }
  }

  findAll(): Promise<Comentario[]> {
    return this.firestoreDb.collection('Comentarios').get().then(snapshot => {
      const comentarios = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Comentario;
      });
      return comentarios;
    }).catch(error => {
      throw new Error('Error obteniendo comentarios');
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  async modificarComentario(id: string, updateComentarioDto: UpdateComentarioDto): Promise<Comentario> {
    try {
      // Crear un objeto para actualizar el cuerpo del comentario
      const cuerpoNuevo = { cuerpo: updateComentarioDto.cuerpoNuevo };
  
      // Actualizar el comentario en Firestore
      await this.firestoreDb.collection('Comentarios').doc(id).update(cuerpoNuevo);
  
      // Obtener el documento actualizado
      const doc = await this.firestoreDb.collection('Comentarios').doc(id).get();
  
      if (!doc.exists) {
        throw new Error('Comentario no encontrado');
      }
        return {
        id: doc.id,
        ...doc.data(),
      } as Comentario;
  
    } catch (error) {
      throw new Error('Error modificando comentario: ' + error.message);
    }
  }

  eleminarComentarioById(id: string) {
    return this.firestoreDb.collection('Comentarios').doc(id).delete().then(() => {
      return 'Comentario eliminado';
    }).catch(error => {
      throw new Error('Error eliminando comentario');
    });
  }


  async todosComentariosDeUnForo(idForo: string): Promise<Comentario[]> {
    try{
      const snapshot = await this.firestoreDb.collection('Comentarios').where('idForo', '==', idForo).get();
      const comentarios = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Comentario;
      });
      return comentarios;
    }catch(error){
      throw new Error('Error obteniendo comentarios');
    }
  }
}
