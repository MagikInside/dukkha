import { Status } from "./status.model";

export interface Character {
  id: string;
  name: string;
  img: string;
  attack: number;
  defense: number;
  health: number;
  points?: number;
  alliance?: string;
  active?: boolean
  status: Status;
}
