import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.sass']
})
export class IntroComponent implements OnInit {
  
  user$: Observable<firebase.User | null>;
  isFirst = true;

  
  
  constructor(private userService: UserService, private router: Router) { 
    this.user$ = userService.user$;
  }
  
  ngOnInit(): void {
  }
  
  next() {
    this.isFirst =false;
  }
  start() {
    this.router.navigate(['selection']);
  }
  
  
}
