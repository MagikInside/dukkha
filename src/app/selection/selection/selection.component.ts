import { Component, OnInit } from '@angular/core';
import {combineLatest, map, Observable} from 'rxjs';
import {Character} from '../../models/character.model';
import { CharactersService } from 'src/app/services/characters.service';
import { StateService } from 'src/app/services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.sass']
})
export class SelectionComponent implements OnInit {

  characters$: Observable<Character[]>;
  displayedCharacter: Character | null = null;
  selectedCharsIds$: Observable<string[]>;
  selectedCharacters$: Observable<Character[]>;

  selectedPoints = 0;

  phase = {
    maxPoints: 5
  }

  constructor(private charactersService: CharactersService, private stateService: StateService, private snackBar: MatSnackBar) {
    this.characters$ = charactersService.characters$;
    this.selectedCharsIds$ = stateService.selectedHeroesStatus$.pipe(map(status => status.map(status => status.id)));
    this.selectedCharacters$ = combineLatest([this.characters$, this.selectedCharsIds$]).pipe(
      map(([characters,selectedCharsIds]) => {
        return characters.filter(character => selectedCharsIds.includes(character.id));
      })
    );
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

  onSelectCharacter(addChar: boolean) {
    if(this.displayedCharacter) {
      if (addChar) {
        const isMaxPoints = !this.stateService.selectCharacter(this.displayedCharacter.id, this.displayedCharacter.points);
        if(isMaxPoints) {
          this.snackBar.open('Max points reached', undefined, {duration: 2000});
        }
      } else {
        this.stateService.deselectCharacter(this.displayedCharacter.id, this.displayedCharacter.points);
      }
    }
  }

}
