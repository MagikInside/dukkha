import { parseHostBindings } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Condition } from '../models/condition.enum';
import { Pair } from '../models/pair.model';
import { RoundInfo } from '../models/round-info.model';
import { Stance } from '../models/stance.model';
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

      const woundsBefore = heroes.reduce((acc, char) => acc + char.status.wounds, 0);
      const impactsBefore = monsters.reduce((acc, char) => acc + char.status.wounds, 0);
      this.updateStatus(pairings, results, roundInfo, woundsBefore, impactsBefore);
    }
  }
  
  updateStatus(pairings: Pair[], results: number[], roundInfo: RoundInfo, woundsBefore: number, impactsBefore: number){
    
    const newHeroesStatus:  Status[] = []
    const newMonstersStatus: Status[] = [];   

    pairings.forEach((pair, index) => {
      newHeroesStatus.push(...pair.heroes.map(hero => this.updateCharStatus(hero, -results[index])));
      newMonstersStatus.push(...pair.monsters.map(monster => this.updateCharStatus(monster, results[index])));
    });

    const woundsRound = newHeroesStatus.reduce((acc, status) => acc + (status?.wounds ?? 0), 0) - woundsBefore;
    const impactsRound = newMonstersStatus.reduce((acc, status) => acc +  (status?.wounds ?? 0), 0) - impactsBefore;
    console.log('RESULTS', results);
    console.log('WOUNDS', woundsRound, 'IMPACTS', impactsRound)

    this.stateService.updateRound(impactsRound, woundsRound, newHeroesStatus, newMonstersStatus);
  }

  
  updateCharStatus(char: Character, result: number): Status {
    if(char.status.condition !== Condition.Dead) {
      let charWounds = 0;
      const defense = char.defense + (char.status.stance === Stance.Defensive ? 1 : 0);
      if(result > ( defense * 3)) {
        charWounds = 3;
      } else if(result > ( defense * 2)) {
        charWounds = 2;
      } else if (result >= defense) {
        charWounds = 1;
      } else if (result < defense) {
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
    const destiny = this.isDestiny(pair);
    const heroesResults = pair.heroes.map(heroe => this.rollService.roll(heroe, destiny));
    const monstersResults = pair.monsters.map(monster => this.rollService.roll(monster));
    const heroesTotalResult = Math.max(...heroesResults) + this.extraCombatantsBonus(heroesResults);
    const monstersTotalResult = Math.max(...monstersResults) + this.extraCombatantsBonus(monstersResults);
    return heroesTotalResult - monstersTotalResult;
  }

  isDestiny(pair: Pair): boolean {
    return pair.heroes.some(heroe => heroe.name === 'Kurt') && pair.heroes.some(heroe => heroe.name === 'Sorniel') && pair.monsters.some(monster => monster.name = "Leshy");
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
