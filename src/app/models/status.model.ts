import { Condition } from "./condition.enum";
import { Stance } from "./stance.model";

export interface Status {
    id: string;
    wounds: number;
    condition: Condition;
    stance: Stance;
  }