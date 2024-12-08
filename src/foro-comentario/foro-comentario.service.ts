import { Injectable } from '@nestjs/common';
import { CreateForoComentarioDto } from './dto/create-foro-comentario.dto';
import { UpdateForoComentarioDto } from './dto/update-foro-comentario.dto';
import { ForoComentario } from './entities/foro-comentario.entity';
import admin from 'firebase-admin'; 
import { ForoService } from 'src/foro/foro.service';

@Injectable()
export class ForoComentarioService {
  private firestoreDb = admin.firestore();
  constructor(private readonly foroService : ForoService) {}

  async crearComentario(createForoComentarioDto: CreateForoComentarioDto): Promise<ForoComentario> {
    try {
      const { comentario, foroId, userId, fecha } = createForoComentarioDto;
  
      const foroRef = this.firestoreDb.collection('Foro').doc(foroId);
      const foroDoc = await foroRef.get();
      if (!foroDoc.exists) {
        throw new Error('Foro does not exist');
      }

      const apoderadoRef = this.firestoreDb.collection('Apoderados').doc(userId);
      const apoderadoDoc = await apoderadoRef.get();
  
      let nombreCompleto;
      if (apoderadoDoc.exists) {
        const data = apoderadoDoc.data();
        nombreCompleto = `${data?.nombre || ''} ${data?.apellido || ''}`.trim(); 
        
      } else {
        const profesorRef = this.firestoreDb.collection('Profesores').doc(userId);
        const profesorDoc = await profesorRef.get();
  
        if (profesorDoc.exists) {
          const data = profesorDoc.data();
          nombreCompleto = `${data?.nombre || ''} ${data?.apellido || ''}`.trim(); 
        } else {
          throw new Error('User does not exist');
        }
      }
  
      const data = {
        comentario: comentario,
        foroId: foroId,
        nombre: nombreCompleto, 
        fecha: fecha,
      };
  
      const comentarioRef = this.firestoreDb.collection('ForoComentario').doc();
      await comentarioRef.set(data);
  
      const asociacionExitosa = await this.foroService.asociarComentario(foroId, comentarioRef.id);
      if (!asociacionExitosa) {
        await comentarioRef.delete();
        throw new Error('Error associating comentario to foro, comentario deleted');
      }
  
      return {
        comentario: comentario,
        foroId: foroId,
        nombre: nombreCompleto, 
        fecha: fecha,
        id: comentarioRef.id,
      } as ForoComentario;
  
    } catch (error) {
      throw new Error('Error creating foroComentario: ' + error.message);
    }
  }

  findAll() {
    return `This action returns all foroComentario`;
  }

  findOne(id: string) {
    return `This action returns a #${id} foroComentario`;
  }

  update(id: string, updateForoComentarioDto: UpdateForoComentarioDto) {
    return `This action updates a #${id} foroComentario`;
  }

  remove(id: string) {
    return `This action removes a #${id} foroComentario`;
  }
}
