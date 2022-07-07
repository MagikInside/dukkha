import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Character} from '../models/character.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {debounceTime, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  
  private heroesCollection: AngularFirestoreCollection<Character>;
  
  constructor(private readonly afs: AngularFirestore) {
    this.heroesCollection = afs.collection<Character>('heroes');
  }
  
  get heroes$(): Observable<Character[]> {
    return this.heroesCollection.valueChanges({ idField: 'id' }).pipe(
      debounceTime(200),
      );
    }
    
    set heroes(heroes: Character[]) {
      heroes
      // .filter(hero => !hero.stop && hero.condition !== 'dead')
      .forEach((hero) => {
        this.heroesCollection.doc(hero.id).update(hero);
      });
    }
    
    updateHero(hero: Character): void {
      this.heroesCollection.doc(hero.id).update(hero);
    }
    
    insertHeroe(hero: Character): void {
      this.heroesCollection.add(hero);
    }
  }
  