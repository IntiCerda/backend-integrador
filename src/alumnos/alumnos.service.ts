import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import admin from 'firebase-admin'; 
import { Alumno } from './entities/alumno.entity';
import { ApoderadosService } from 'src/apoderados/apoderados.service';
import { Curso } from 'src/cursos/entities/curso.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';


@Injectable()
export class AlumnosService {
  private firestoreDb = admin.firestore();
  constructor(private readonly apoderadosService: ApoderadosService) {}


async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
  try {
    const apoderadoExiste = await this.apoderadosService.getApoderadoById(createAlumnoDto.apoderadoId);
    if (!apoderadoExiste) {
      throw new UnauthorizedException('No such document!'); 
    }

    const docRef = await this.firestoreDb.collection('Alumnos').add(createAlumnoDto);
    

    await this.apoderadosService.addAlumnoToApoderado(createAlumnoDto.apoderadoId, docRef.id);

    const cursoId = createAlumnoDto.curso; 
    const cursoDoc = await this.firestoreDb.collection('Cursos').doc(cursoId).get();
    if (!cursoDoc.exists) {
      throw new Error('Curso no encontrado!');
    }

    const cursoData = cursoDoc.data() as Curso;

    if (!Array.isArray(cursoData.alumnos)) {
      cursoData.alumnos = []; 
    }

    cursoData.alumnos.push({ id: docRef.id, nombre: createAlumnoDto.nombre, apellido: createAlumnoDto.apellido} as Alumno); // Asegúrate de que el DTO tenga la información necesaria

    await this.firestoreDb.collection('Cursos').doc(cursoId).update({
      alumnos: cursoData.alumnos
    });

    return {
      ...createAlumnoDto,
      id: docRef.id,
    } as Alumno;

  } catch (error) {
    throw new Error('Error creating alumno: ' + error.message);
  }
}

  async findAll(): Promise<{ id: string; nombre: string; apoderadoNombre: string | null }[]> {
    try {
      const snapshot = await this.firestoreDb.collection('Alumnos').get();
      const alumnosPromises = snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const apoderadoId = data.apoderadoId;
  
        let apoderadoNombre = null;
        if (apoderadoId) {
          const apoderadoDoc = await this.firestoreDb.collection('Apoderados').doc(apoderadoId).get();
          if (apoderadoDoc.exists) {
            const apoderadoData = apoderadoDoc.data();
            apoderadoNombre = `${apoderadoData?.nombre} ${apoderadoData?.apellido}`;
          }
        }
  
        return {
          nombre: data.nombre,
          apellido: data.apellido,
          rut: data.rut,
          fechaNacimiento: data.fechaNacimiento,
          curso: data.curso,
          id: doc.id,
          apoderadoNombre: apoderadoNombre,
        } as { id: string; nombre: string; apoderadoNombre: string | null };
      });
  
      const alumnos = await Promise.all(alumnosPromises);
  
      return alumnos;
  
    } catch (error) {
      throw new Error('Error retrieving alumnos: ' + error.message);
    }
  }

  async getAlumnoById(id: string): Promise<Alumno | null> {
    try {
      const doc = await this.firestoreDb.collection('Alumnos').doc(id).get();
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

  async update(id: string, updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    const alumno = await this.getAlumnoById(id);
  
    if (!alumno) {
      throw new NotFoundException(`Alumno con ID ${id} no encontrado`);
    }
  
    const updateData: { [key: string]: any } = {};
  
    Object.keys(updateAlumnoDto).forEach(key => {
      const value = updateAlumnoDto[key];
      if (value !== undefined && value !== "") {
        updateData[key] = value;
      }
    });
  
    if (Object.keys(updateData).length === 0) {
      throw new Error("No hay datos para actualizar.");
    }
  
    await this.firestoreDb.collection('Alumnos').doc(id).update(updateData);
  
    return { ...alumno, ...updateData }; 
  }

  async deleteAlumnoById(id: string): Promise<Alumno | null> {
    try {
      const doc = await this.firestoreDb.collection('Alumnos').doc(id).get();
      if (!doc.exists) {
        throw new UnauthorizedException('No such document!'); 
      }
      const alumnoData = doc.data() as Alumno;
      await this.firestoreDb.collection('Alumnos').doc(id).delete();
      this.associateAlumnosWithApoderados();
      return {
        ...alumnoData,
        id: doc.id, 
      };
    } catch (error) {
      console.error('Error removing document:', error);
      throw new Error('Error removing document');
    }
  }

  async associateAlumnosWithApoderados(): Promise<void> {
    try {
      const alumnosSnapshot = await this.firestoreDb.collection('Alumnos').get();
      const apoderadosMap = new Map<string, Set<string>>();
  
      alumnosSnapshot.docs.forEach(doc => {
        const alumnoData = doc.data();
        const apoderadoId = alumnoData.apoderadoId;
  
        if (apoderadoId) {
          if (!apoderadosMap.has(apoderadoId)) {
            apoderadosMap.set(apoderadoId, new Set<string>());
          }
          apoderadosMap.get(apoderadoId)?.add(doc.id);
        }
      });
  
      for (const [apoderadoId, alumnosIds] of apoderadosMap.entries()) {
        const apoderadoRef = this.firestoreDb.collection('Apoderados').doc(apoderadoId);
        const apoderadoDoc = await apoderadoRef.get();
  
        if (apoderadoDoc.exists) {
          const apoderadoData = apoderadoDoc.data() || {};
          const existingAlumnos = new Set(apoderadoData.alumnos || []);
  
          alumnosIds.forEach(alumnoId => existingAlumnos.add(alumnoId));
  
          await apoderadoRef.update({ alumnos: Array.from(existingAlumnos) });
          console.log(`Updated apoderado ${apoderadoId} with alumnos:`, Array.from(existingAlumnos));
        } else {
          console.log(`No such apoderado: ${apoderadoId}`);
        }
      }
    } catch (error) {
      throw new Error('Error associating alumnos with apoderados: ' + error.message);
    }
  }

  async getAsistenciaDeAlumno(alumnoId: string):Promise<{ nombre: string; fecha: string; asistencia: boolean; }[]> {
    try {
      const alumnoDoc = await this.firestoreDb.collection('Alumnos').doc(alumnoId).get();
      if (!alumnoDoc.exists) {
        throw new NotFoundException('Alumno no encontrado.');
      }
  
      const data = alumnoDoc.data();
      const asistencias = data.asistencia || []; 
  
      const asistenciaPromises = asistencias.map(async (asistencia: Asistencia) => {
        const asignaturaDoc = await this.firestoreDb.collection('Asignaturas').doc(asistencia.asignaturaId).get();
        const asignaturaData = asignaturaDoc.data();
  
        return {
          nombreAsignatura: asignaturaData?.nombre || 'Desconocida', 
          fecha: asistencia.fecha,
          asistencia: asistencia.asistencia,
        };
      });
      const resultados = await Promise.all(asistenciaPromises);  
      return resultados;
    } catch (error) { 
      throw new Error('Error obteniendo la asistencia: ' + error.message);
    }
  }

}
