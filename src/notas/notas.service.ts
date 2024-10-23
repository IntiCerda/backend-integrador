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
      const {alumnoId, profesorId, calificacion} = createNotaDto;

      const docRef = this.firestoreDb.collection('Notas').doc();
      const alumnoRef = this.firestoreDb.collection('Alumnos').doc(alumnoId);
      const profesorRef = this.firestoreDb.collection('Profesores').doc(profesorId);
      const alumnoDoc = await alumnoRef.get();
      const profesorDoc = await profesorRef.get();

      if(!alumnoDoc.exists){
        throw new Error('Alumno does not exist');
      }

      if(!profesorDoc.exists){
        throw new Error('Profesor does not exist');
      }

      await docRef.set({
        id: docRef.id,
        alumnoId: alumnoId,
        profesorId: profesorId,
        calificacion: calificacion,
      });

      return {
        id: docRef.id,
        alumnoId: alumnoId,
        profesorId: profesorId,
        calificacion: calificacion,
        fecha: new Date().toISOString() // Assuming you want to add a date field
      } as Nota;

    } catch (error) {
      throw new Error('Error creating nota: ' + error.message);
    }   
  }

  async getNotasTodosAlumnos(): Promise<{ alumnoId: string; nombre: string; notas: Nota[] }[]> {
    try {
      // Obtener todas las notas
      const notasSnapshot = await this.firestoreDb.collection('Notas').get();
      const notas: Nota[] = notasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Nota));
  
      // Obtener los IDs de los alumnos a partir de las notas
      const alumnoIds = [...new Set(notas.map(nota => nota.alumnoId))];
  
      // Obtener los nombres de los alumnos
      const alumnosPromises = alumnoIds.map(async (alumnoId) => {
        const alumnoDoc = await this.firestoreDb.collection('Alumnos').doc(alumnoId).get();
        return {
          id: alumnoId,
          nombre: alumnoDoc.exists ? `${alumnoDoc.data()?.firstName} ${alumnoDoc.data()?.lastName}` : null,
        };
      });
  
      const alumnos = await Promise.all(alumnosPromises);
  
      // Agrupar notas por alumno
      const notasPorAlumno = alumnos.map(alumno => ({
        alumnoId: alumno.id,
        nombre: alumno.nombre,
        notas: notas.filter(nota => nota.alumnoId === alumno.id),
      }));
  
      // Ordenar las notas por el nombre del alumno
      notasPorAlumno.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
  
      return notasPorAlumno;
  
    } catch (error) {
      throw new Error('Error fetching notas: ' + error.message);
    }
  }

  async getNotasDeUnAlumno(alumnoId: string): Promise<{ alumnoId: string; nombre: string; notas: Nota[] }> {
    try {
      // Obtener las notas del alumno específico
      const notasSnapshot = await this.firestoreDb.collection('Notas').where('alumnoId', '==', alumnoId).get();
      const notas: Nota[] = notasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Nota));
  
      // Obtener el documento del alumno para obtener su nombre
      const alumnoDoc = await this.firestoreDb.collection('Alumnos').doc(alumnoId).get();
      if (!alumnoDoc.exists) {
        throw new Error('Alumno no encontrado');
      }
  
      const alumnoData = alumnoDoc.data();
      const nombreCompleto = `${alumnoData?.firstName} ${alumnoData?.lastName}`;
  
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
