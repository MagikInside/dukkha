import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  constructor(private readonly afs: AngularFirestore) { }

  getScores(): Observable<{name: string, score: number}[]> {
    return this.afs.collection<State>('states').valueChanges().pipe(
      map(states => states.map( state => {
        return { name: state.user?.name ?? '', score: state.score };
    })
    ));
  }
}
