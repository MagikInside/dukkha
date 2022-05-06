import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Character} from '../../models/character.model';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.sass']
})
export class SelectionComponent implements OnInit {

  characters$: Observable<Character[]>;
  displayedCharacter: Character | null = null;
  selectedCharacters = new Set<Character>();
  selectedPoints = 0;

  phase = {
    maxPoints: 5
  }

  constructor(private charactersService: CharactersService) {
    this.characters$ = charactersService.characters$;
  }

  ngOnInit(): void {
  }

  onDisplayCharacter(character: Character) {
    if (this.displayedCharacter) {
      this.displayedCharacter.active = false;
    }
    character.active = true;
    this.displayedCharacter = character;
  }

  onSelectCharacter() {
    if(this.displayedCharacter) {
      if(this.selectedPoints + this.displayedCharacter.points <=
        this.phase.maxPoints) {
        this.selectedPoints += this.displayedCharacter.points;
        this.selectedCharacters.add(this.displayedCharacter);
      } else {
          alert('Maximum points already selected');
      }

    }
  }

}
