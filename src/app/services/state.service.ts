import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, of, OperatorFunction, switchMap, tap } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UserService } from "./user.service";
import { State } from "../models/state.model";
import { User } from "../models/user.model";
import { Answers } from "../models/answers.model";
import { Status } from "../models/status.model";
import { Condition } from "../models/condition.enum";
import { Stance } from "../models/stance.model";


let _state: State = {
  step: -1, answers: [], scrollUp: false, selectedHeroesStatus: [], availablePoints: 6
}

@Injectable({
    providedIn: 'root'
  })
export class StateService {

    private store = new BehaviorSubject<State>(_state);
    public state$ = this.store.asObservable();

    public user$ = this.state$.pipe(map(state => state.user), filter(user => !!user) as OperatorFunction<User | undefined, User>, distinctUntilChanged());
    public selectedHeroesStatus$ = this.state$.pipe(map(state => state.selectedHeroesStatus),  filter(selectedChars => !!selectedChars) as OperatorFunction<Status[] | undefined, Status[]>, distinctUntilChanged());

      constructor(private readonly afs: AngularFirestore, private userService: UserService) {
        this.userService.user$.pipe(
          switchMap(user => {
            if (user) {
            return this.afs.doc<State>('states/' + user.uid).valueChanges().pipe(
              tap(state => {
                  if (!state) {
                this.afs.collection<State>('states').doc(user.uid).set({ user: {name: user.displayName, uid: user.uid}, step: 0, answers: [], scrollUp: false,  selectedHeroesStatus: [], availablePoints: 6 });
                }
              }));
          } else {
            return of(undefined);
          }
      }),
      filter(state => state !== undefined) as OperatorFunction<State | undefined, State>
      ).subscribe(state => this.store.next(_state = state));
      }

      incrementStep(step: number) {
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ step: step + 1 , scrollUp: true });
      }

      updateAnswers( answers: Answers) {
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ answers, scrollUp: false });
      }

      updateSelectedChars( selectedHeroesStatus: Status[]) {
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ selectedHeroesStatus, scrollUp: false });
      }

      selectCharacter( selectedCharacterId: string, points: number): boolean {
        if (!_state.selectedHeroesStatus.some(status => status.id === selectedCharacterId)) {
          if(_state.availablePoints - points >= 0) {
            this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ selectedHeroesStatus: [..._state.selectedHeroesStatus, {
              id: selectedCharacterId,
              results: [],
              condition: Condition.Ok,
              stance: Stance.Defensive,
            }], availablePoints: _state.availablePoints - points, scrollUp: false });
            return true;
          } else {
            return false;
          }
        }
        throw new Error('Already selected character');      
      }

      deselectCharacter( selectedCharacterId: string, points: number) {
        const newSelectedHeroesStatus = _state.selectedHeroesStatus.filter(status => status.id !== selectedCharacterId);
        if (newSelectedHeroesStatus.length !== _state.selectedHeroesStatus.length) {
          this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ selectedHeroesStatus: newSelectedHeroesStatus, availablePoints: _state.availablePoints + points, scrollUp: false });  
        }        
      }

      updateStance(selectedCharacterId: string, stance: Stance) {
        const charStatusIndex = _state.selectedHeroesStatus.findIndex(status => status.id === selectedCharacterId);
        const newCharStatus = {..._state.selectedHeroesStatus[charStatusIndex], stance }
        const newSelectedHeroesStatus = [..._state.selectedHeroesStatus.slice(0, charStatusIndex), newCharStatus, ..._state.selectedHeroesStatus.slice(charStatusIndex +1)  ]
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ selectedHeroesStatus: newSelectedHeroesStatus  });  

      }

  }