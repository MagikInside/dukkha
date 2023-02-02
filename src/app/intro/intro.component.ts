import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { State } from '../models/state.model';
import { User } from '../models/user.model';
import { Answers } from '../models/answers.model';
import { ValidationService } from '../services/validation.service';
import { ConclusionService } from '../services/conclusion.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.sass']
})
export class IntroComponent implements OnInit {
  
  user$: Observable<User>;
  state$: Observable<State | undefined>;
  canContinue: boolean = false;
  fightVictory$: Observable<boolean | null>;

  
  constructor(private userService: UserService, private stateService: StateService, private router: Router, private validationService: ValidationService, private conclusionService: ConclusionService) { 
    this.user$ = this.stateService.user$;
    this.state$ = this.stateService.state$.pipe(
      tap((state) => {
        if(state.scrollUp) {
          window.scrollTo({top: 0, behavior: 'smooth'});
        }
        this.canContinue = this.validationService.canContinue(state.answers, state.step);
      })
    );
    this.fightVictory$ = this.stateService.fightVictory$;
  }
  
  ngOnInit(): void {
  }
  
  next(step: number) {
    if(step === 7) {
      this.conclusionService.setScore();
    }
    this.stateService.incrementStep(step);
  }

  onAnswerChange(answers: Answers, step: number) {
    this.stateService.updateAnswers(answers);
    this.canContinue = this.validationService.canContinue(answers, step);
  }
  
  
}
