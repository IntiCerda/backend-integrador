import { Injectable } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import admin from 'src/firebase.config';
import { Nota } from './entities/nota.entity';

@Injectable()
export class NotasService {
  private firestoreDb = admin.firestore();

  async create(createNotaDto: CreateNotaDto): Promise<Nota> {
    try{
      
      const {calificacion, alumnoId, asignaturaId, fecha,  } = createNotaDto;

      const alumnoExiste = await this.firestoreDb.collection('Alumnos').doc(alumnoId).get();
      const asignaturaExiste = await this.firestoreDb.collection('Asignaturas').doc(asignaturaId).get();


      if(!alumnoExiste.exists){
        throw new Error('Alumno does not exist');
      }


      if(!asignaturaExiste.exists){
        throw new Error('Asignatura does not exist');
      }
      
      const docRef = this.firestoreDb.collection('Notas').doc();

      const data = {
        id: docRef.id,
        calificacion: calificacion,
        alumnoId : alumnoExiste.data().id,
        asignaturaId : asignaturaExiste.data().id,
        fecha : fecha
        
      };
      await docRef.set(data);

      return {
        id: docRef.id,
        calificacion: calificacion,
        alumnoId : alumnoExiste.data().id,
        asignaturaId : asignaturaExiste.data().id,
        fecha : fecha
      } as Nota;

    } catch (error) {
      throw new Error('Error creating nota: ' + error.message);
    }   
  }

  async getNotasTodosAlumnos(): Promise<{ alumnoId: string; nombre: string; notas: Nota[] }[]> {
    try {
      
      const notasSnapshot = await this.firestoreDb.collection('Notas').get();
      const notas: Nota[] = notasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Nota));
  
      
      const alumnoIds = [...new Set(notas.map(nota => nota.alumnoId))];
  
      
      const alumnosSnapshot = await this.firestoreDb.collection('Alumnos').get();
      const alumnosMap = alumnosSnapshot.docs.reduce((acc, doc) => {
        const alumnoData = doc.data();
        acc[doc.id] = `${alumnoData.firstName} ${alumnoData.lastName}`;
        return acc;
      }, {} as Record<string, string>);
  
      
      const notasPorAlumno = alumnoIds.map(alumnoId => ({
        alumnoId: alumnoId,
        nombre: alumnosMap[alumnoId] || null,
        notas: notas.filter(nota => nota.alumnoId === alumnoId),
      }));
  
      
      notasPorAlumno.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
  
      return notasPorAlumno;
  
    } catch (error) {
      throw new Error('Error fetching notas: ' + error.message);
    }
  }

  async getNotasDeUnAlumno(alumnoId: string): Promise<{ alumnoId: string; nombre: string; notas: Nota[] }> {
    try {
      // Obtener el documento del alumno por su ID
      const alumnoDoc = await this.firestoreDb.collection('Alumnos').doc(alumnoId).get();
      if (!alumnoDoc.exists) {
        throw new Error('Alumno no encontrado');
      }
  
      const alumnoData = alumnoDoc.data();
      const nombreCompleto = `${alumnoData?.name} ${alumnoData?.lastName}`;
  
      // Obtener las notas del alumno específico por su nombre
      const notasSnapshot = await this.firestoreDb.collection('Notas').where('alumno', '==', alumnoData.nombre).get();
      const notas: Nota[] = notasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Nota));
  
      // Retornar el resultado
      return {
        alumnoId: alumnoId,
        nombre: nombreCompleto,
        notas: notas,
      };
  
    } catch (error) {
      throw new Error('Error obteniendo las notas del alumno: ' + error.message);
    }
  }

  update(id: number, updateNotaDto: UpdateNotaDto) {
    return `This action updates a #${id} nota`;
  }

  async eliminarNota(notaId: string): Promise<void> {
    try {
      const notaRef = this.firestoreDb.collection('Notas').doc(notaId);
      const notaDoc = await notaRef.get();
  
      if (!notaDoc.exists) {
        throw new Error('Nota no encontrada');
      }
      await notaRef.delete();
      
    } catch (error) {
      throw new Error('Error eliminando la nota: ' + error.message);
    }
  }
}
