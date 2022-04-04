import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-prolog',
  templateUrl: './prolog.component.html',
  styleUrls: ['./prolog.component.sass']
})
export class PrologComponent implements OnInit {

  @Input() user: firebase.User | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
