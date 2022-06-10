import { Condition } from "./condition.enum";

export interface Status {
    id: string;
    dices?: string[];
    condition?: Condition;
    stop?: boolean;
    roll?: number;
    heals?: number;
  }