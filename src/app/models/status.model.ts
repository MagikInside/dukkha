import { Condition } from "./condition.enum";
import { Stance } from "./stance.model";

export interface Status {
    id: string;
    results: string[];
    condition: Condition;
    stance: Stance;
  }