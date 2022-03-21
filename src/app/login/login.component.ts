import { Component, OnInit, Optional } from '@angular/core';
import { ELEMENTS } from '../models/elements';
import { Element } from '../models/element.model'; 
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  selectedElement: Element | null = null;
  readonly elements = ELEMENTS;

  constructor(@Optional() private auth: Auth) { }

  ngOnInit(): void {
  }

  selectElement(element?: Element) {
    if (element) {
      this.selectedElement = element;
  }
}

async login() {
  return await signInWithPopup(this.auth, new GoogleAuthProvider());
}

}
