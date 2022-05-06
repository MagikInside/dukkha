import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { State } from '../models/state.model';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.sass']
})
export class IntroComponent implements OnInit {
  
  user$: Observable<firebase.User | null>;
  state$: Observable<State | undefined>;
  
  constructor(private userService: UserService, private stateService: StateService, private router: Router) { 
    this.user$ = userService.user$;
    this.state$ = this.stateService.getState();
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
