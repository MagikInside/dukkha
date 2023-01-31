import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../models/state.model';
import { ScoresService } from '../services/scores.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.sass']
})
export class ConclusionComponent  {
  score$: Observable<number>;
  listScores$: Observable<{name: string, score: number}[]>;

  constructor(private stateService: StateService, private scoresService: ScoresService) { 
    this.score$ = this.stateService.score$;
    this.listScores$ = this.scoresService.getScores();
  }



}
