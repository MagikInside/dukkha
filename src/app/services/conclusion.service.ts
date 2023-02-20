import { Injectable } from '@angular/core';
import { AnswersResults } from '../models/answers-results.model';
import { Answers } from '../models/answers.model';
import { Condition } from '../models/condition.enum';
import { QUESTIONS } from '../models/questions';
import { State } from '../models/state.model';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ConclusionService {
  
  constructor(private stateService: StateService) {}
  
  setScore() {
    const state = this.stateService.getState();
    const answersResults = this.getAnswersResults(state.answers);
    
    const decisionsScore = this.getDecisionsScore(answersResults);
    const fightScore = this.figthResultScore(state);
    
    this.stateService.setResults(decisionsScore + fightScore, answersResults);
  }
  
  figthResultScore(state: State): number {
    let score = 0;
    if(state.fightVictory) {
      score += 5;
    }
    const deadMonsters = state.monstersStatus.filter(status => status.condition === Condition.Dead).length;
    const survivors = state.selectedHeroesStatus.filter(status => status.condition !== Condition.Dead).length;
    
    return score + deadMonsters + survivors;
  }
  
  getAnswersResults(answers: Answers): AnswersResults {
    const answersResults: AnswersResults = {
      color: '',
      plus: null, 
      strategy: '',
      factionLead: '',
      vanguardFaction: '',
      fallenDistrict: '',
    }
    switch(answers[0]) {
      case 0: {
        answersResults.color = 'blue';
        answersResults.plus = answers[1] === 0;
        break;
      }
      case 1: {
        answersResults.color = 'white';
        answersResults.plus = answers[1] === 1;
        break;
      } 
      case 2: {
        answersResults.color = 'red';
        answersResults.plus = answers[1] === 2;
        break;
      } 
      case 3: {
        answersResults.color = 'black';
        answersResults.plus = answers[1] === 3;
        break;
      }
      default: {}
    }
    
    answersResults.strategy = QUESTIONS[2][answers[2]].name;
    answersResults.factionLead = QUESTIONS[3][answers[3]].name;
    answersResults.vanguardFaction = QUESTIONS[4][answers[4]].name;
    answersResults.fallenDistrict = QUESTIONS[5][answers[5]].name;
    
    return answersResults
  }
  
  
  getDecisionsScore(answersResults: AnswersResults): number {
    let score = 0;
    
    score += answersResults.plus ? 2 : 1;
    
    score += answersResults.strategy === 'Evacuate' ? 2 : 0;
    score += answersResults.strategy === 'Defend' ? 1 : 0;
    
    score += answersResults.factionLead === "Harpers" ? 2 : 0;
    score += answersResults.vanguardFaction === "Lord's alliance" ? 2 : 0;
    
    score -= answersResults.factionLead === "Zhentarim" ? 2 : 0;
    score -= answersResults.vanguardFaction === "Zhentarim" ? 1 : 0;
    
    score -= answersResults.factionLead === answersResults.vanguardFaction ? 2 : 0;
    
    score += answersResults.fallenDistrict === 'Temple district' ? 2 : 0;
    score += answersResults.fallenDistrict === 'Noble district' ? 1 : 0;
    
    score -= answersResults.fallenDistrict === "The Slums" ? 2 : 0;
    
    return score;
    
  }
  
}
