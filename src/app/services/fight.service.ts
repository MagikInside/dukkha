import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Condition } from '../models/condition.enum';
import { Pair } from '../models/pair.model';
import { RoundInfo } from '../models/round-info.model';
import { Status } from '../models/status.model';
import { HeroesService } from './heroes.service';
import { MonstersService } from './monsters.service';
import { RollService } from './roll.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class FightService {
  
  constructor(private stateService: StateService, private heroesService: HeroesService, private monstersService: MonstersService, private rollService: RollService) { }
  
  fight(): void {
    const heroes = this.heroesService.selectedHeroes?.filter(heroe => heroe.status.condition !== Condition.Dead);
    const monsters = this.monstersService.monsters?.filter(monster => monster.status.condition !== Condition.Dead);
    const roundInfo = this.stateService.getState().roundInfo;

    if(heroes?.length && monsters?.length && heroes.length > 0 && monsters.length > 0) {
      const pairings = this.createParings(heroes, monsters);
      const results = pairings.map(pair => this.fightPair(pair));
      this.updateStatus(pairings, results, roundInfo);
    }
  }
  
  updateStatus(pairings: Pair[], results: number[], roundInfo: RoundInfo){
    
    const newHeroesStatus:  Status[] = []
    const newMonstersStatus: Status[] = [];

    pairings.forEach((pair, index) => {
      newHeroesStatus.push(...pair.heroes.map(hero => this.updateCharStatus(hero, -results[index])));
      newMonstersStatus.push(...pair.monsters.map(monster => this.updateCharStatus(monster, results[index])));
    });
    const woundsRound = newHeroesStatus.reduce((acc, status) => acc + (status?.wounds ?? 0), 0) - roundInfo.totalWounds;
    const impactsRound = newMonstersStatus.reduce((acc, status) => acc +  (status?.wounds ?? 0), 0) - roundInfo.totalImpacts;
    console.log('RESULTS', results);
    console.log('WOUNDS', woundsRound, 'IMPACTS', impactsRound)

    this.stateService.updateRound(impactsRound, woundsRound, newHeroesStatus, newMonstersStatus);
  }
  
  updateCharStatus(char: Character, result: number): Status {
    if(char.status.condition !== Condition.Dead) {
      let charWounds = 0;
      if(result > ( char.defense * 3)) {
        charWounds = 3;
      } else if(result > ( char.defense * 2)) {
        charWounds = 2;
      } else if (result >= char.defense) {
        charWounds = 1;
      } else if (result < char.defense) {
        charWounds = 0;
      }
      if (charWounds > 0) {
        
        let newWounds = char.status.wounds + charWounds;
        if(newWounds > char.health) {
          newWounds = char.health;
        }
        const newCondition = this.calculateNewCharCondition(char, newWounds);
        return {...char.status, condition: newCondition, wounds: newWounds};
      }
    }
    return char.status;
  }
  
  calculateNewCharCondition(char: Character, wounds: number): Condition {
    const injuryLevel = wounds / char.health;
    if(injuryLevel >= 1) {
      return Condition.Dead;
    } else if(injuryLevel >= .8) {
      return Condition.Critical;
    } else if(injuryLevel >= .5) {
      return Condition.Injured;
    } else {
      return Condition.Ok;
    }
  }
  
  fightPair(pair: Pair): number {
    const heroesResults = pair.heroes.map(heroe => this.rollService.roll(heroe));
    const monstersResults = pair.monsters.map(monster => this.rollService.roll(monster));
    const heroesTotalResult = Math.max(...heroesResults) + this.extraCombatantsBonus(heroesResults);
    const monstersTotalResult = Math.max(...monstersResults) + this.extraCombatantsBonus(monstersResults);
    return heroesTotalResult - monstersTotalResult;
  }
  
  extraCombatantsBonus(results: number[]): number {
    return (results.filter(result => result >= 0).length - 1) * 2;
  }
  
  createParings(heroes: Character[], monsters: Character[]): Pair[] {
    const areMoreHeroes = heroes.length  >= monsters.length;
    const {minNumCharsInPair, remainder, numOfPairings} = areMoreHeroes ? this.calculatePairs(heroes, monsters) :  this.calculatePairs(monsters, heroes);
    const pairings: Pair[] = [];
    for (let i = 0; i< numOfPairings; i++) {
      const addOne = remainder > i;
      const charsInPair = minNumCharsInPair + (addOne ? 1 : 0);
      const pair = this.createIPair(i, charsInPair, areMoreHeroes, heroes, monsters);
      pairings.push(pair);
    }
    return pairings;
  }
  

// solo los no muertos
  calculatePairs(biggerList: Character[], shorterList: Character[]): {minNumCharsInPair: number, remainder: number, numOfPairings: number} {
    const minNumCharsInPair = Math.floor(biggerList.length / shorterList.length);
    const remainder =  biggerList.length % shorterList.length;
    const numOfPairings = shorterList.length;
    return {minNumCharsInPair, remainder, numOfPairings};
  }
  
  createIPair(i: number, charsInPair: number, areMoreHeroes: boolean, heroes: Character[], monsters: Character[]): Pair {
    const heroesIPair = areMoreHeroes ? heroes.slice(i * charsInPair, (i+1) * charsInPair) : [heroes[i]];
    const monstersIPair = areMoreHeroes ? [monsters[i]] : monsters.slice(i * charsInPair, (i+1) * charsInPair);
    return {heroes: heroesIPair, monsters: monstersIPair};
  }
  
}