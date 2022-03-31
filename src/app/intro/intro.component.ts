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
  factions = [
    {name: "Lord's alliance", img: 'alliance.webp'},
    {name: "Emerald Enclave", img: 'emerald.webp'},
    {name: "Harpers", img: 'harpers.webp'},
    {name: "Order of the Gauntlet", img: 'order.webp'},
    {name: "Zhentarim", img: 'zhentarim.webp'},
  ]

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
