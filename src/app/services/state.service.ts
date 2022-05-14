import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, of, OperatorFunction, switchMap, tap } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UserService } from "./user.service";
import { State } from "../models/state.model";
import { User } from "../models/user.model";
import { Answers } from "../models/answers.model";

@Injectable({
    providedIn: 'root'
  })
export class StateService {

    private store = new BehaviorSubject<State>({ step: 0, answers: [] });
    public state$ = this.store.asObservable();

    public user$ = this.state$.pipe(map(state => state.user), filter(user => !!user) as OperatorFunction<User | undefined, User>, distinctUntilChanged());
 
      constructor(private readonly afs: AngularFirestore, private userService: UserService) {
        this.userService.user$.pipe(
          switchMap(user => {
            if (user) {
            return this.afs.doc<State>('states/' + user.uid).valueChanges().pipe(
              tap(state => {
                  if (!state) {
                this.afs.collection<State>('states').doc(user.uid).set({ step: 0, answers: []});
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
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ step: step + 1 });
      }

      updateAnswers( answers: Answers) {
        this.afs.collection<State>('states').doc(this.userService.user?.uid).update({ answers });
      }

  }