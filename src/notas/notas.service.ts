import { Injectable } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import admin from 'src/firebase.config';
import { Nota } from './entities/nota.entity';

@Injectable()
export class NotasService {
  private firestoreDb = admin.firestore();

  async create(createNotaDto: CreateNotaDto): Promise<Nota> {
    try {
      const { calificacion, alumnoId, asignaturaId, fecha } = createNotaDto;
  
      const alumnoRef = this.firestoreDb.collection('Alumnos').doc(alumnoId);
      const asignaturaRef = this.firestoreDb.collection('Asignaturas').doc(asignaturaId);
  
      const alumnoExiste = await alumnoRef.get();
      const asignaturaExiste = await asignaturaRef.get();
  
      if (!alumnoExiste.exists) {
        throw new Error('Alumno does not exist');
      }
  
      if (!asignaturaExiste.exists) {
        throw new Error('Asignatura does not exist');
      }
  
      const docRef = this.firestoreDb.collection('Notas').doc();
  
      const data = {
        id: docRef.id,
        calificacion: calificacion,
        alumnoId: alumnoExiste.data().id,
        asignaturaId: asignaturaExiste.data().id,
        fecha: fecha
      };
  
      await docRef.set(data);
  
      const alumnoData = alumnoExiste.data();
      const nuevaNota = {
        id: docRef.id,
        calificacion: calificacion,
        asignaturaId: asignaturaExiste.data().id,
        fecha: fecha
      };
  
      const notasActuales = alumnoData.notas || [];
      notasActuales.push(nuevaNota);
  
      await alumnoRef.update({
        notas: notasActuales
      });
  
      return {
        id: docRef.id,
        calificacion: calificacion,
        alumnoId: alumnoData.id,
        asignaturaId: asignaturaExiste.data().id,
        fecha: fecha
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
      const alumnoDoc = await this.firestoreDb.collection('Alumnos').doc(alumnoId).get();
      if (!alumnoDoc.exists) {
        throw new Error('Alumno no encontrado');
      }
  
      const alumnoData = alumnoDoc.data();
      const nombreCompleto = `${alumnoData?.nombre} ${alumnoData?.apellido}`;
  
      const notas: Nota[] = alumnoData.notas || [];
  
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

  async createBulkNotas(notas: CreateNotaDto[]): Promise<Nota[]> {
    const resultados: Nota[] = [];
  
    try {
      const batch = this.firestoreDb.batch();
  
      for (const nota of notas) {
        const { alumnoId, asignaturaId } = nota;
  
        const alumnoRef = this.firestoreDb.collection('Alumnos').doc(alumnoId);
        const alumnoDoc = await alumnoRef.get();
        if (!alumnoDoc.exists) {
          throw new Error(`Alumno con ID ${alumnoId} no encontrado`);
        }
  
        const asignaturaRef = this.firestoreDb.collection('Asignaturas').doc(asignaturaId);
        const asignaturaDoc = await asignaturaRef.get();
        if (!asignaturaDoc.exists) {
          throw new Error(`Asignatura con ID ${asignaturaId} no encontrada`);
        }
  
        const docRef = this.firestoreDb.collection('Notas').doc();
        const notaData = {
          id: docRef.id,
          calificacion: nota.calificacion,
          alumnoId: alumnoId,
          asignaturaId: asignaturaId,
          fecha: nota.fecha,
        };
  
        batch.set(docRef, notaData);
  
        const alumnoData = alumnoDoc.data();
        const notasActuales = alumnoData.notas || [];
        notasActuales.push(notaData);
        batch.update(alumnoRef, { notas: notasActuales }); 
  
        resultados.push(notaData);
      }
  
      await batch.commit(); 
      return resultados;
  
    } catch (error) {
      throw new Error('Error creando notas: ' + error.message);
    }
  }

}
