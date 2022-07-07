import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Character} from '../../models/character.model';

@Component({
  selector: 'app-heroes-display',
  templateUrl: './heroes-display.component.html',
  styleUrls: ['./heroes-display.component.sass']
})
export class DisplayComponent implements OnInit {

  @Input() heroes: Character[] | null = [];
  @Output() displayHeroe = new EventEmitter<Character>();

  constructor() { }

  ngOnInit(): void {
    if(this.heroes?.length) {
      this.display(this.heroes[0]);
    }
  }
  
  display(hero: Character) {
    this.displayHeroe.emit(hero);
  }
}
