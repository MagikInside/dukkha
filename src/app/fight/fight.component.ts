import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { HeroesService } from '../services/heroes.service';
import { MonstersService } from '../services/monsters.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.sass']
})
export class FightComponent implements OnInit {

  selectedHeroes$: Observable<Character[]>;
  monsters$: Observable<Character[]>;

  constructor(private heroesService: HeroesService, private stateService: StateService, private monstersService: MonstersService) {
    this.selectedHeroes$ = combineLatest([this.heroesService.heroes$, this.stateService.selectedHeroesStatus$]).pipe(
      map(([heroes,selectedCharsIds]) => {
        return heroes.filter(character => selectedCharsIds.some(status => status.id === character.id));
      })
    );
    this.monsters$ = this.monstersService.monsters$;

    
  }

  ngOnInit(): void {
  }

}
