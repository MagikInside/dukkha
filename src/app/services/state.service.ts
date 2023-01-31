import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, distinctUntilChanged, filter, map, of, OperatorFunction, switchMap, tap } from "rxjs";
import { Answers } from "../models/answers.model";
import { Condition } from "../models/condition.enum";
import { RoundInfo } from "../models/round-info.model";
import { Stance } from "../models/stance.model";
import { State } from "../models/state.model";
import { Status } from "../models/status.model";
import { User } from "../models/user.model";
import { UserService } from "./user.service";


const initalRoundInfo: RoundInfo = { round: 0, impacts: 0, wounds: 0, totalImpacts: 0, totalWounds: 0 }

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  private store = new BehaviorSubject<State>({
    step: -1, answers: [], 
    scrollUp: false, 
    selectedHeroesStatus: [],
    monstersStatus: [],
    availablePoints: 12,
    roundInfo : initalRoundInfo,
    fightVictory: null,
    score: 0
  });
  public state$ = this.store.asObservable();
  
  public user$ = this.state$.pipe(map(state => state.user), filter(user => !!user) as OperatorFunction<User | undefined, User>, distinctUntilChanged());
  public selectedHeroesStatus$ = this.state$.pipe(map(state => state.selectedHeroesStatus),  filter(selectedChars => !!selectedChars) as OperatorFunction<Status[] | undefined, Status[]>, distinctUntilChanged());
  public monstersStatus$ = this.state$.pipe(map(state => state.monstersStatus),  filter(monstersStatus => !!monstersStatus) as OperatorFunction<Status[] | undefined, Status[]>, distinctUntilChanged());
  public roundInfo$ = this.state$.pipe(map(state => state.roundInfo), distinctUntilChanged());
  public fightVictory$ = this.state$.pipe(map(state => state.fightVictory), distinctUntilChanged());
  public availablePoints$ = this.state$.pipe(map(state => state.availablePoints), distinctUntilChanged());
  public score$ = this.state$.pipe(map(state => state.score), distinctUntilChanged());
  
  
  constructor(private readonly afs: AngularFirestore, private userService: UserService) {
    this.userService.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<State>('states/' + user.uid).valueChanges().pipe(
            tap(state => {
              if (!state) {
                this.afs.collection<State>('states').doc(user.uid).set({ user: {name: user.displayName, uid: user.uid}, step: 0, answers: [], scrollUp: false,  selectedHeroesStatus: [], monstersStatus: [], availablePoints: 12, roundInfo : initalRoundInfo, fightVictory: null, score: 0 });
              }
            }));
          } else {
            return of(undefined);
          }
        }),
        filter(state => state !== undefined) as OperatorFunction<State | undefined, State>
        ).subscribe(state => this.store.next(state));
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
        const state = this.store.getValue();
        if (!state.selectedHeroesStatus.some(status => status.id === selectedCharacterId)) {
          if(state.availablePoints - points >= 0) {
            this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ selectedHeroesStatus: [...state.selectedHeroesStatus, {
              id: selectedCharacterId,
              wounds: 0,
              condition: Condition.Ok,
              stance: Stance.Defensive,
            }], availablePoints: state.availablePoints - points, scrollUp: false });
            return true;
          } else {
            return false;
          }
        }
        throw new Error('Already selected character');      
      }
      
      deselectCharacter( selectedCharacterId: string, points: number) {
        const state = this.store.getValue();
        const newSelectedHeroesStatus = state.selectedHeroesStatus.filter(status => status.id !== selectedCharacterId);
        if (newSelectedHeroesStatus.length !== state.selectedHeroesStatus.length) {
          this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ selectedHeroesStatus: newSelectedHeroesStatus, availablePoints: state.availablePoints + points, scrollUp: false });  
        }        
      }
      
      updateStance(selectedCharacterId: string, stance: Stance) {
        const state = this.store.getValue();
        const charStatusIndex = state.selectedHeroesStatus.findIndex(status => status.id === selectedCharacterId);
        const newCharStatus = {...state.selectedHeroesStatus[charStatusIndex], stance }
        const newSelectedHeroesStatus = [...state.selectedHeroesStatus.slice(0, charStatusIndex), newCharStatus, ...state.selectedHeroesStatus.slice(charStatusIndex +1)  ]
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ selectedHeroesStatus: newSelectedHeroesStatus  });  
        
      }
      
      updateMonstersStatus(newMonstersStatus: Status[]): void {
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({  monstersStatus: newMonstersStatus });  
      }
      
      getState(): State {
        return this.store.getValue()
      }
      
      updateRound(impacts: number, wounds: number, heroesStatus: Status[], monstersStatus: Status[]) {
        const state = this.store.getValue();
        console.log(impacts, wounds, heroesStatus, monstersStatus);
        const newRoundInfo = {round: state.roundInfo.round + 1, impacts, wounds, totalImpacts: state.roundInfo.totalImpacts + impacts, totalWounds: state.roundInfo.totalWounds + wounds };
        const newHeroesStatus = state.selectedHeroesStatus.map(heroe => heroesStatus.find(h => h.id === heroe.id) ?? heroe) ;
        const newMonstersStatus = state.monstersStatus.map(monster=> monstersStatus.find(m => m.id ===  monster.id) ?? monster) ;
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({  roundInfo: newRoundInfo, selectedHeroesStatus: newHeroesStatus, monstersStatus: newMonstersStatus, scrollUp: false,  });  
      }
      
      setFightResult(isVictory: boolean) {
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({  fightVictory: isVictory, step: 6, scrollUp: true }); 
      }

      setScore(score: number) {
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({  score }); 
      }
      
    }