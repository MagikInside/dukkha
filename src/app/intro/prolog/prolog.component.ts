import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-prolog',
  templateUrl: './prolog.component.html',
  styleUrls: ['./prolog.component.sass']
})
export class PrologComponent implements OnInit {

  @Input() user: User | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
