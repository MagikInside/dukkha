import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Character} from '../models/character.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonstersService {


  private monstersCollection: AngularFirestoreCollection<Character>;

  constructor(private readonly afs: AngularFirestore) {
    this.monstersCollection =  afs.collection<Character>('monsters');

  }

  get monsters$(): Observable<Character[]> {
    return this.monstersCollection.valueChanges({ idField: 'id' }).pipe(
      debounceTime(200)
    );
  }

}
