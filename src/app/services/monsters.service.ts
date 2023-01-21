import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {Character} from '../models/character.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {debounceTime, map, tap} from 'rxjs/operators';
import { StateService } from './state.service';
import { Condition } from '../models/condition.enum';
import { Stance } from '../models/stance.model';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class MonstersService {


  private monstersCollection: AngularFirestoreCollection<Character>;

  constructor(private readonly afs: AngularFirestore, private stateService: StateService) {
    this.monstersCollection =  afs.collection<Character>('monsters');

  }

  get monsters$(): Observable<Character[]> {
    return combineLatest([this.monstersCollection.valueChanges({ idField: 'id' }), this.stateService.monstersStatus$]).pipe(
      tap(([monsters, monstersStatus]) => {
        if(!monstersStatus.length){
          this.stateService.updateMonstersStatus(this.initialMonstersStatus(monsters));
        }
      }),
      map(([monsters, monstersStatus]) => {
        return monsters.map(monster => {
        return {...monster, status: monstersStatus.find(status => status.id === monster.id) };
      })
    }),
      debounceTime(200)
    );
    }

    initialMonstersStatus(monsters: Character[]): Status[] {
      return monsters.map(monster => {
        return {
          id: monster.id,
          results: [],
          condition: Condition.Ok,
          stance: Stance.Offensive
        };
      });
    } 

}
