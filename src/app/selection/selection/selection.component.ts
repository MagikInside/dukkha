import { Component, OnInit } from '@angular/core';
import {combineLatest, map, Observable} from 'rxjs';
import {Character} from '../../models/character.model';
import { HeroesService } from 'src/app/services/heroes.service';
import { StateService } from 'src/app/services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.sass']
})
export class SelectionComponent implements OnInit {

  heroes$: Observable<Character[]>;
  displayedHeroe: Character | null = null;
  selectedHeroes$: Observable<Character[]>;

  selectedPoints = 0;

  phase = {
    maxPoints: 5
  }

  constructor(private heroesService: HeroesService, private stateService: StateService, private snackBar: MatSnackBar) {
    this.heroes$ = heroesService.heroes$;
    this.selectedHeroes$ = this.heroesService.selectedHeroes$;
  }

  ngOnInit(): void {
  }

  onDisplayHeroe(heroe: Character) {
    if (this.displayedHeroe) {
      this.displayedHeroe.active = false;
    }
    heroe.active = true;
    this.displayedHeroe = heroe;
  }

  onSelectHeroe(addChar: boolean) {
    if(this.displayedHeroe) {
      if (addChar) {
        const isMaxPoints = !this.stateService.selectCharacter(this.displayedHeroe.id, this.displayedHeroe.points ?? 0);
        if(isMaxPoints) {
          this.snackBar.open('Max points reached', undefined, {duration: 2000});
        }
      } else {
        this.stateService.deselectCharacter(this.displayedHeroe.id, this.displayedHeroe.points ?? 0);
      }
    }
  }

}
