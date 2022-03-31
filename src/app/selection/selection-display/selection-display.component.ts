import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Character} from '../../models/character.model';

@Component({
  selector: 'app-selection-display',
  templateUrl: './selection-display.component.html',
  styleUrls: ['./selection-display.component.sass']
})
export class SelectionDisplayComponent implements OnInit {

  @Input() character: Character | null = null;
  @Input() selectedCharacters: Set<Character> | null = null;
  @Input() selectedPoints = 0;
  @Output() selectCharacter = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  select() {
      this.selectCharacter.emit();
  }

}
