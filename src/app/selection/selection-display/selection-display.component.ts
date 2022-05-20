import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Character} from '../../models/character.model';

@Component({
  selector: 'app-selection-display',
  templateUrl: './selection-display.component.html',
  styleUrls: ['./selection-display.component.sass']
})
export class SelectionDisplayComponent {

  @Input() character: Character | null = null;
  @Input() selectedCharacters: Character[] | null = [];

  @Input() selectedPoints = 0;

}
