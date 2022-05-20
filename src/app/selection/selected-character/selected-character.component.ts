import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-selected-character',
  templateUrl: './selected-character.component.html',
  styleUrls: ['./selected-character.component.sass']
})
export class SelectedCharacterComponent implements OnInit, OnChanges {

  @Input() character: Character | null = null;
  @Input() selectedCharsIds: string[] | null = null;
  @Output() selectCharacter = new EventEmitter<boolean>();
  selected = false;

  ngOnInit(): void {
    console.log(this.character, this.selectedCharsIds);
    this.selected = this.selectedCharsIds?.some(id => this.character?.id === id) || false;
  }
  ngOnChanges({character}: {character: SimpleChange}) {
    if(character && character?.currentValue !== character.previousValue) {
      this.selected = this.selectedCharsIds?.some(id => this.character?.id === id) || false;
    } else {
      this.selected = false;
    }
  }
    

  select(addChar: boolean) {
    this.selectCharacter.emit(addChar);
}

}
