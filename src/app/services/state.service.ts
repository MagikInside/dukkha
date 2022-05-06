import { Injectable } from "@angular/core";
import { Observable, of, switchMap, tap } from "rxjs";
import { Phase } from "../models/phases.model";
import { Player } from "../models/player.model";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UserService } from "./user.service";
import { State } from "../models/state.model";

@Injectable({
    providedIn: 'root'
  })
export class StateService {
 
      constructor(private readonly afs: AngularFirestore, private userService: UserService) {
      }

      getState(): Observable<State | undefined>  {
        if (this.userService.uid) {    
        return this.afs.doc<State>('states/' + this.userService.uid).valueChanges().pipe(
          tap(state => {
            console.log(state,  this.userService.uid);
              if (!state && this.userService.uid) {
              this.afs.collection<State>('states').doc(this.userService.uid).set({uid: this.userService.uid, step: 0});
            }
          })
        );
        } else {
          return this.userService.user$.pipe(
            switchMap(user => {
              if (user) {
              return this.afs.doc<State>('states/' + user.uid).valueChanges().pipe(
                tap(state => {
                    if (!state) {
                  this.afs.collection<State>('states').doc(user.uid).set({uid: user.uid, step: 0});
                  }
                }));
            } else {
              return of(undefined);
            }
        })
          );
      }
    }

      incrementStep(step: number) {
        this.afs.collection<State>('states').doc(this.userService.uid).update({step: step + 1});
      }

  }