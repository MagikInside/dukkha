export interface Character {
  id: string;
  name: string;
  img: string;
  attack: number;
  defense: number;
  points: number;
  alliance?: string;
  active?: boolean;
}
