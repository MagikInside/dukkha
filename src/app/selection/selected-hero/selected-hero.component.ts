import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-selected-heroe',
  templateUrl: './selected-hero.component.html',
  styleUrls: ['./selected-heroe.component.sass']
})
export class SelectedHeroeComponent implements OnInit, OnChanges {

  @Input() heroe: Character | null = null;
  @Input() selectedHeroesIds: string[] | null = null;
  @Output() selectHeroe = new EventEmitter<boolean>();
  selected = false;

  ngOnInit(): void {
    this.selected = this.selectedHeroesIds?.some(id => this.heroe?.id === id) || false;
  }
  ngOnChanges({heroe}: {heroe: SimpleChange}) {
    if(heroe && heroe?.currentValue !== heroe.previousValue) {
      this.selected = this.selectedHeroesIds?.some(id => this.heroe?.id === id) || false;
    } else {
      this.selected = false;
    }
  }
    

  select(addHeroe: boolean) {
    this.selectHeroe.emit(addHeroe);
}

}
