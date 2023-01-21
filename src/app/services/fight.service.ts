import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor(private stateService: StateService) { }

  fight(): void {
    const state = this.stateService.getState();
    const heroesStatus = state.selectedHeroesStatus;
    const monstersStatus = state.monstersStatus;

    const pairing = [
      {heroes: [], monsters: []}

    ];


  }
}
