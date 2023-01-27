import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Character } from '../models/character.model';
import { Condition } from '../models/condition.enum';
import { RoundInfo } from '../models/round-info.model';
import { FightService } from '../services/fight.service';
import { HeroesService } from '../services/heroes.service';
import { MonstersService } from '../services/monsters.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.sass']
})
export class FightComponent {
  
  selectedHeroes$: Observable<Character[]>;
  monsters$: Observable<Character[]>;
  roundInfo$: Observable<RoundInfo>;

  
  
  constructor(private heroesService: HeroesService, private stateService: StateService, private monstersService: MonstersService, private fightService: FightService) {
    this.selectedHeroes$ = this.heroesService.selectedHeroes$.pipe(
      tap(heroes => { 
        if(heroes.every(h => h.status.condition === Condition.Dead)) {
          this.isFightOver(false);
        }
      })
      );
      this.monsters$ = this.monstersService.monsters$.pipe(
        tap(monsters => { 
          if(monsters.every(m => m.status.condition === Condition.Dead)) {
            this.isFightOver(true);
          }
        })
        );
        this.roundInfo$ = this.stateService.roundInfo$;

      }
      
      isFightOver(isVictory: boolean) {
        this.stateService.setFightResult(isVictory);
      }
      
      fight(): void {
        this.fightService.fight();
      }
      
    }
    