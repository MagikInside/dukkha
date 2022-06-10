import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { CharactersService } from '../services/characters.service';
import { MonstersService } from '../services/monsters.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.sass']
})
export class FightComponent implements OnInit {

  selectedCharacters$: Observable<Character[]>;
  monsters$: Observable<Character[]>;

  constructor(private charactersService: CharactersService, private stateService: StateService, private monstersService: MonstersService) {
    this.selectedCharacters$ = combineLatest([this.charactersService.characters$, this.stateService.selectedHeroesStatus$]).pipe(
      map(([characters,selectedCharsIds]) => {
        return characters.filter(character => selectedCharsIds.some(status => status.id === character.id));
      })
    );
    this.monsters$ = this.monstersService.monsters$;
  }

  ngOnInit(): void {
  }

}
