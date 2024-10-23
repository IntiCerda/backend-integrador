import { Injectable } from '@nestjs/common';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import admin from 'src/firebase.config';
import { Noticia } from './entities/noticia.entity';

@Injectable()
export class NoticiasService {
  private firebasestoreDb = admin.firestore();

  async create(createNoticiaDto: CreateNoticiaDto): Promise <Noticia> {
    try{
      const docRef = this.firebasestoreDb.collection('Noticias').doc();
      await docRef.set(createNoticiaDto);
      return {
        ...createNoticiaDto,
        id: docRef.id,
      } as Noticia;

    }catch(error){
      throw new Error('Error creating noticia: ' + error.message);
    } 
  }

  async findAll():Promise<Noticia[]> {
    try{
      const snapshot = await this.firebasestoreDb.collection('Noticias').get();
      const noticias = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Noticia;
      });
      return noticias;
    }catch(error){
      throw new Error('Error retrieving noticias');
    }
  }

  async getNoticeById(id: string) {
    try{
      const docRef = this.firebasestoreDb.collection('Noticias').doc(id);
      const doc = await docRef.get();

      if(!doc.exists){
        console.log('No such document!');
        return null;
      }

      return {
        id: doc.id,
        ...doc.data(),
      } as Noticia;
    }catch(error){
      throw new Error('Error retrieving noticia: ' + error.message);
    }
  }

  update(id: number, updateNoticiaDto: UpdateNoticiaDto) {
    return `This action updates a #${id} noticia`;
  }

  async eliminarNoticeById(id: string) {
    try{
      const docRef = this.firebasestoreDb.collection('Noticias').doc(id);
      const doc = await docRef.get();

      if(!doc.exists){
        console.log('No such document!');
        return null;
      }
      
    }catch(error){
      throw new Error('Error deleting noticia: ' + error.message);
    }
  }
}
