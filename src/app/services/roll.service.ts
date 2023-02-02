import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Condition } from '../models/condition.enum';
import { Stance } from '../models/stance.model';

@Injectable({
  providedIn: 'root'
})
export class RollService {

  roll(character: Character, destiny?: boolean): number {
    if(character.status.condition !== Condition.Dead) {
      const destinyBonus = destiny ? 10 : 0;
      return character.attack - this.rollDice() + this.stanceMod(character) + this.statusMod(character) + destinyBonus;
    } else {
      return -1;
    }
  }

  private rollDice(): number {
    return this.rollD6() + this.rollD6() + this.rollD6();
  }

  private rollD6(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

private stanceMod(charater: Character): number {
  return charater.status?.stance === Stance.Offensive ? 1 : 0;
}

private statusMod(charater: Character): number {
  switch(charater.status?.condition) {
    case Condition.Injured: return -1;
    case Condition.Critical: return -2;
    default: return 0;
  }
}

}
