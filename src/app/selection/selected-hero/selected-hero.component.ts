import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-selected-heroe',
  templateUrl: './selected-hero.component.html',
  styleUrls: ['./selected-heroe.component.sass']
})
export class SelectedHeroeComponent implements OnInit, OnChanges {

  @Input() heroe: Character | null = null;
  @Input() selectedHeroes: Character[] | null = null;
  @Output() selectHeroe = new EventEmitter<boolean>();
  selected = false;

  ngOnInit(): void {
    this.selected = this.selectedHeroes?.some(heroe => this.heroe?.id === heroe.id) || false;
  }
  ngOnChanges({heroe, selectedHeroes}: SimpleChanges) {
    if((heroe && heroe?.currentValue !== heroe.previousValue) || (selectedHeroes.currentValue !== selectedHeroes.previousValue)) {
      this.selected = this.selectedHeroes?.some(heroe => this.heroe?.id === heroe.id) || false;
    } else {
      this.selected = false;
    }
  }
    
  select(addHeroe: boolean) {
    this.selectHeroe.emit(addHeroe);
}

}
