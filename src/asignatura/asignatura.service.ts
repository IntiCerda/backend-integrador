import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';
import admin from 'firebase-admin'; 
import { Asignatura } from './entities/asignatura.entity';
import { CursosService } from 'src/cursos/cursos.service';
import { ProfesoresService } from 'src/profesores/profesores.service';
import { Alumno } from 'src/alumnos/entities/alumno.entity';


@Injectable()
export class AsignaturaService {
  private firestoreDb = admin.firestore();
  constructor(private readonly profesorService: ProfesoresService,
    private readonly cursoService: CursosService,
  ) {}

  async create(createAsignaturaDto: CreateAsignaturaDto) { 
    try {
      const {nombre,profesorId, cursoId } = createAsignaturaDto;
      const profesorE = await this.profesorService.getProfesorById(profesorId);

      if(!profesorE){
        throw new UnauthorizedException('No such document!'); 
      }
      const cursoE = await this.cursoService.getCursoById(cursoId);
      if(!cursoE){
        throw new UnauthorizedException('No such document!'); 
      } 
      const docRef = await this.firestoreDb.collection('Asignaturas').add(createAsignaturaDto);
      
      const data = {
        nombre: nombre,
        profesor:profesorE,
        curso: cursoE,
        id: docRef.id,
       }

       await docRef.set(data);
       await this.profesorService.asignarAsignatura(profesorE.id, docRef.id);
       

       return {
        ...data
      } as Asignatura;
      
    } catch (error) {
      throw new Error('Error creating asignatura: ' + error.message);
    }
  }

  async findAll() {
    try{
      const snapshot = await this.firestoreDb.collection('Asignaturas').get();
      const asignaturas = snapshot.docs.map(doc => {
        const data = doc.data();

        return {
          ...data,
          id: doc.id,
        } as Asignatura;

      });
      return asignaturas;

    }catch(error){
      throw new Error('Error retrieving asignaturas');
    }
  }

  async getAsignaturaById(id: string): Promise<Asignatura | null> {
    try{
      const doc = await this.firestoreDb.collection('Asignaturas').doc(id).get();
      if(!doc.exists){
        throw new UnauthorizedException('No such document!');

      }else{
        const data = doc.data();
        return{
          ...data,
          id: doc.id,
        }as Asignatura;
      }
    }catch(error){
      throw new Error('Error getting document');
    }


  }

  update(id: number, updateAsignaturaDto: UpdateAsignaturaDto) { // ver que updatear
    return `This action updates a #${id} asignatura`;
  }

  async removeAsignaturaById(id: string): Promise<Asignatura | null> {
    try{
      const doc = await this.firestoreDb.collection('Asignaturas').doc(id).get();
      if(!doc.exists){
        throw new UnauthorizedException('No such document!');
      }
      const asignaturaData = doc.data() as Asignatura;
      await this.firestoreDb.collection('Asignaturas').doc(id).delete();
      
      return{
        ...asignaturaData,
        id: doc.id,
      } as Asignatura;
    }catch(error){
      throw new Error('Error deleting asignatura');
    }
  }

  //Esto ya no es asi...
  async setAsignaturaToProfesor(asignaturaId: string, profesorId: string): Promise<Asignatura | null> {
    try{
      const asignaturaRef = this.firestoreDb.collection('Asignaturas').doc(asignaturaId);
      const profesorRef = this.firestoreDb.collection('Profesores').doc(profesorId);
      const asignatura = await asignaturaRef.get();
      const profesor = await profesorRef.get();

      if(!asignatura.exists || !profesor.exists){
        throw new UnauthorizedException('No such document!');
      }

      await asignaturaRef.update({profesorId: profesorId});
      return{
        ...asignatura.data(),
        id: asignatura.id,
      } as Asignatura;

      }catch(error){
      throw new Error('Error setting asignatura to profesor');
    }
  }


  async getCursosDeAsignatura(id: string): Promise<Asignatura | null> {
    try{
      const doc = await this.firestoreDb.collection('Asignaturas').doc(id).get();
      if(!doc.exists){
        throw new UnauthorizedException('No such document!');
      }
      const asignaturaData = doc.data() as Asignatura;
      return{
        ...asignaturaData,
        id: doc.id,
      } as Asignatura;
    }catch(error){
      throw new Error('Error getting cursos de asignatura');
    }
  }

  //funcion que retorna los alumnos de el curso de la asignatura
  async getAlumnosDeAsignatura(id: string): Promise<Alumno[] | null> {
    try{
      const doc = await this.firestoreDb.collection('Asignaturas').doc(id).get();
      if(!doc.exists){
        throw new UnauthorizedException('No such document!');
      }
      
      const asignaturaData = doc.data() as Asignatura;
      const cursoId = asignaturaData.curso.id;
      const cursoDoc = await this.firestoreDb.collection('Cursos').doc(cursoId).get();
      if(!cursoDoc.exists){
        throw new UnauthorizedException('No such document!');
      }
      const cursoData = cursoDoc.data();
      const alumnos = cursoData.alumnos as Alumno[];
      
      return alumnos;

    }catch(error){
      throw new Error('Error getting alumnos de asignatura');
    }
  }

}
