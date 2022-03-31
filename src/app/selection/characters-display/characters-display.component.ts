import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Character} from '../../models/character.model';

@Component({
  selector: 'app-characters-display',
  templateUrl: './characters-display.component.html',
  styleUrls: ['./characters-display.component.sass']
})
export class DisplayComponent implements OnInit {

  @Input() characters: Character[] | null = [];
  @Output() displayCharacter = new EventEmitter<Character>();

  constructor() { }

  ngOnInit(): void {
    if(this.characters?.length) {
      this.display(this.characters[0]);
    }
  }
  
  display(character: Character) {
    this.displayCharacter.emit(character);
  }
}
