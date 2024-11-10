import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import admin from 'firebase-admin'; 
import { User } from './entities/user.entity';
import { DocumentSnapshot } from 'firebase-admin/firestore'; // Importa desde firebase-admin

@Injectable()
export class UsersService {
  private firestoreDb = admin.firestore(); 

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { uid, ...data } = createUserDto;
      const docRef = this.firestoreDb.collection('user').doc(uid);
      await docRef.set(data);
      
      return {
        ...createUserDto,
        id: docRef.id, 
      } as User;

    } catch (error) {

      console.error('Error adding document: ', error);
      throw new Error('Error creating user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const snapshot = await this.firestoreDb.collection('Users').get();
      const users = snapshot.docs.map(doc => {
        const data = doc.data() 
        return {
          ...data,
          uid: doc.id, 
        } as User;
      });
      return users; 

    } catch (error) {
      console.error('Error getting documents: ', error);
      throw new Error('Error retrieving users');
    }
  }

  async findOne(id: string) {
    try {
      const doc = await this.firestoreDb.collection('Users').doc(id.toString()).get();
      if (!doc.exists) {
        throw new UnauthorizedException('No such document!');
      } else {
        return doc.data();
      }
    } catch (error) {
      console.error('Error getting document: ', error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  getUserById(id: string): Promise<User | null> {
    return this.firestoreDb.collection('Users').doc(id).get().then((snapshot: DocumentSnapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data(); 
        return {
          ...data,
          uid: snapshot.id, 
        } as User;
      } else {
        return null; 
      }
    });
  }

  deleteUserById(id: string): Promise<User | null> {
    return this.firestoreDb.collection('Users').doc(id).get().then((snapshot: DocumentSnapshot) => {
      if (snapshot.exists) {
        const userData = snapshot.data() as User; 
        return this.firestoreDb.collection('Users').doc(id).delete().then(() => userData);
      } else {
        return null; 
      }
    });
  }
}