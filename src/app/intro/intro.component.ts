import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { State } from '../models/state.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.sass']
})
export class IntroComponent implements OnInit {
  
  user$: Observable<User>;
  state$: Observable<State | undefined>;
  canContinue: boolean = false;
  
  constructor(private userService: UserService, private stateService: StateService, private router: Router) { 
    this.user$ = this.stateService.user$;
    this.state$ = this.stateService.state$;
  }
  
  ngOnInit(): void {
  }
  
  next(step: number) {
    if(step === 5) {
      this.router.navigate(['selection']);
    } else {
    this.stateService.incrementStep(step);
    window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
  
  
}
