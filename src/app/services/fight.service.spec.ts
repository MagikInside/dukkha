import { TestBed } from '@angular/core/testing';
import { HEROES_MOCK } from '../mocks/heroes.mock';
import { MONSTERS_MOCK } from '../mocks/monsters.mock';

import { FightService } from './fight.service';

describe('FightService', () => {
  let service: FightService;
  const mockStateService = {};
  const mockHeroesService = { selectedHeroes: HEROES_MOCK };
  const mockMonstersService = { monsters: MONSTERS_MOCK };
  const mockRollService = { roll: jasmine.createSpy() };

  beforeEach(() => {

    service = new FightService(mockStateService as any, mockHeroesService as any, mockMonstersService as any, mockRollService as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
