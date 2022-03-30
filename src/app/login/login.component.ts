import { Component, OnInit, Optional } from '@angular/core';
import { ELEMENTS } from '../models/elements';
import { Element } from '../models/element.model'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  selectedElement: Element | null = null;
  readonly elements = ELEMENTS;

  constructor(public readonly auth: AngularFireAuth,) { }

  ngOnInit(): void {
  }

  selectElement(element?: Element) {
    if (element) {
      this.selectedElement = element;
  }
}

async login() {
  await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

}
