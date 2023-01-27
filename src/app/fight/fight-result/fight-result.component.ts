import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fight-result',
  templateUrl: './fight-result.component.html',
  styleUrls: ['./fight-result.component.sass']
})
export class FightResultComponent  {

  @Input() fightVictory: boolean | null = null;

}
