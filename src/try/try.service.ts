import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin'; 

@Injectable()
export class TryService {
    private firestoreDb = admin.firestore(); 

    async createData(data: any): Promise<void> {
        try {
            const docRef = await this.firestoreDb.collection('Alumnos').add(data); //collection es la primera colección que se crea
            console.log('Data created with ID: ', docRef.id);
            
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }
}