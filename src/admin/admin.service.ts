import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import admin from 'src/firebase.config';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  private firestoreDb = admin.firestore();


  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    try{
      const { id, ...data } = createAdminDto;
      const docRef = this.firestoreDb.collection('Admin').doc(id);
      await docRef.set(data);
      return {
        ...data,
        id: id,
      } as Admin;
    }catch(error){
      throw new Error('Error creating admin: ' + error.message);
    }
  }

  async findAll(): Promise <Admin[]> {
    try{
      const snapshot = await this.firestoreDb.collection('Admin').get();
      const admins = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Admin;
      });
      return admins;

    }catch(error){
      throw new Error('Error retrieving admins');
    }
  }

  async getAdminById(id: string): Promise<Admin | null> {
    try{
      const docRef = this.firestoreDb.collection('Admin').doc(id);
      const doc = await docRef.get();

        if(!doc.exists){
          console.log('No such document!');
          return null;
        }
        return {
          id: doc.id,
          ...doc.data(),
        } as Admin;
    }catch(error){
      throw new Error('Error retrieving admin: ' + error.message);
    }

  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  async eliminarAdminById(id: string) {
    try{
      const docRef = this.firestoreDb.collection('Admin').doc(id);
      const doc = await docRef.get();

      if(!doc.exists){
        return null
      }

      const adminData = {
        id: doc.id,
        ...doc.data(),
      }as Admin;
      return adminData;
    }catch(error){
      throw new Error('Error deleting admin: ' + error.message);
    }

  }
}
