import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswersResults } from '../models/answers-results.model';
import { User } from '../models/user.model';
import { ScoresService } from '../services/scores.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.sass']
})
export class ConclusionComponent  {
  score$: Observable<number>;
  user$: Observable<User>;
  answersResults$: Observable<AnswersResults | null>
  listScores$: Observable<{name: string, score: number}[]>;
  fightVictory$: Observable<boolean | null>

  constructor(private stateService: StateService, private scoresService: ScoresService) { 
    this.score$ = this.stateService.score$;
    this.listScores$ = this.scoresService.getScores();
    this.answersResults$ = this.stateService.answersResults$;
    this.user$ = this.stateService.user$;
    this.fightVictory$ = this.stateService.fightVictory$;
  }



}
