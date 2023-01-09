import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Condition } from 'src/app/models/condition.enum';
import { Stance } from 'src/app/models/stance.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass']
})
export class CharacterComponent {

  @Input() character: Character | null = null;
  @Input() isHero = true;
  @Output() stanceChange = new EventEmitter<Stance>();
  Condition = Condition;
  Stance = Stance;

  changeStance(stance: Stance) {
    if(stance !== this.character?.status?.stance) {
      this.stanceChange.emit(stance);
    }
  }

}
