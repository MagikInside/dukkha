import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { RoundInfo } from '../models/round-info.model';
import { Stance } from '../models/stance.model';
import { FightService } from '../services/fight.service';
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
  roundInfo$: Observable<RoundInfo>;

  constructor(private heroesService: HeroesService, private stateService: StateService, private monstersService: MonstersService, private fightService: FightService) {
    this.selectedHeroes$ = this.heroesService.selectedHeroes$;
    this.monsters$ = this.monstersService.monsters$;
    this.roundInfo$ = this.stateService.roundInfo$;
  }

  ngOnInit(): void {
  }

  fight(): void {
    this.fightService.fight();
  }

}
