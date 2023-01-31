import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Character } from '../models/character.model';
import { Condition } from '../models/condition.enum';
import { Stance } from '../models/stance.model';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  selectedHeroes: Character[] | null = null;

  private readonly EMPTY_STATUS = { id: '', wounds: 0, condition: Condition.Ok, stance: Stance.Offensive};
  private readonly EMPTY_HEROE: Character = { id: '', name: '', img: '', attack: 0, defense: 0, health: 0, status: this.EMPTY_STATUS };

  private heroesCollection: AngularFirestoreCollection<Character>;

  
  constructor(private readonly afs: AngularFirestore, private stateService: StateService) {
    this.heroesCollection = afs.collection<Character>('heroes');
  }
  
  get selectedHeroes$(): Observable<Character[]> {
    return combineLatest([this.heroesCollection.valueChanges({ idField: 'id' }), this.stateService.selectedHeroesStatus$]).pipe(
      map(([heroes, heroesStatus]) => {
        return heroesStatus.map(status => {
          const heroe = heroes.find(heroe => status.id === heroe.id);
          if(heroe) {
            return {...heroe, status };
          } else {
            return this.EMPTY_HEROE;
          }  
        })
      }),
    tap(heroes => this.selectedHeroes = heroes) 
    );
  
    }

    get heroes$(): Observable<Character[]> {
      return this.heroesCollection.valueChanges({ idField: 'id' });
      }
    
    set heroes(heroes: Character[]) {
      heroes
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
  