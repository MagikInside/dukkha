import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Phase } from "../models/phases.model";

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

  }