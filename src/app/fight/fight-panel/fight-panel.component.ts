import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Stance } from 'src/app/models/stance.model';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-fight-panel',
  templateUrl: './fight-panel.component.html',
  styleUrls: ['./fight-panel.component.sass']
})
export class FightPanelComponent {
  @Input() heroes: Character[] | null = null;
  @Input() monsters: Character[] | null = null;

  constructor(private stateService: StateService) {
  }

  onStanceChange(stance: Stance, id: string) {
    this.stateService.updateStance(id, stance);
  }
  
  drop(e:  CdkDragDrop<Character[]>) {
    console.log('drop', e)
  }
}
