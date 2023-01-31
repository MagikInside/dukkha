import { Injectable } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { Condition } from '../models/condition.enum';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ConclusionService {


  constructor(private stateService: StateService) {}

  setScore() {
    const state = this.stateService.getState();
    let score = 0;
    if(state.fightVictory) {
      score += 5;
    }
    console.log(state.monstersStatus);
    const deadMonsters = state.monstersStatus.filter(status => status.condition === Condition.Dead).length;
    console.log(deadMonsters);
    score += deadMonsters;
    this.stateService.setScore(score);
  }
}
