import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../models/character.model';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  
  private heroesCollection: AngularFirestoreCollection<Character>;
  
  constructor(private readonly afs: AngularFirestore, private stateService: StateService) {
    this.heroesCollection = afs.collection<Character>('heroes');
  }
  
  get selectedHeroes$(): Observable<Character[]> {
    return combineLatest([this.heroesCollection.valueChanges({ idField: 'id' }), this.stateService.selectedHeroesStatus$]).pipe(
      map(([heroes, heroesStatus]) => {
        return heroes
        .filter(heroe => heroesStatus.some(status => status.id === heroe.id))
        .map(heroe => {
        return {...heroe, status: heroesStatus.find(status => status.id === heroe.id) };
      })
    }));
    }

    get heroes$(): Observable<Character[]> {
      return this.heroesCollection.valueChanges({ idField: 'id' });
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
  