import { Character } from "./character.model";
import { Status } from "./status.model";

export interface Combatant {
  isMonster: boolean;
  character: Character;
  status: Status;
}
