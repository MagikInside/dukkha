import { Injectable } from "@angular/core";
import { Observable, of, switchMap, tap } from "rxjs";
import { Phase } from "../models/phases.model";
import { Player } from "../models/player.model";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
  })
export class PhasesService {
      phases: Phase[] = [
        {
            maxPoints: 5,
            monsters: [
                {type: 'goblin', number: 7},
                {type: 'bugbear', number: 1},
            ]
          }
        
    ];

    getPhases(): Observable<Phase[]> {
        return of(this.phases);
    }
      private playersCollection: AngularFirestoreCollection<Player>;
     // private phasesCollection: AngularFirestoreCollection<Phase>;
  
      constructor(private readonly afs: AngularFirestore, private userService: UserService) {
        this.playersCollection = this.afs.collection<Player>('players');
        const player = afs.doc<Player>('players/' + userService.uid).valueChanges().pipe(
          tap(player => {
            console.log('INSIDE', player, userService.uid);
            if (!player && userService.uid) {
              this.afs.collection<Player>('players').add({uid: userService.uid});
            }
          })
        ).subscribe(player => console.log(player));
        
      }

  }