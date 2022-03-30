import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.sass']
})
export class IntroComponent implements OnInit {

  user$: Observable<firebase.User | null>;

  constructor(private userService: UserService) { 
    this.user$ = userService.user$;
  }

  ngOnInit(): void {
  }

}
