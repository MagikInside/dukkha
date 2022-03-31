import { Condition } from './condition.enum';
import { Difficulty } from './difficulty.enum';

export interface Character {
  id: string;
  name: string;
  img: string;
  attack: number;
  defense: number;
  dices: string[];
  condition: Condition;
  difficulty: Difficulty;
  stop: boolean;
  roll: number;
  heals: number;
  points: number;
  alliance: string;
  active?: boolean;
}
