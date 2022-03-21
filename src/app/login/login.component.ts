import { Component, OnInit } from '@angular/core';
import { ELEMENTS } from '../models/elements';
import { Element } from '../models/element.model'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  selectedElement: Element | null = null;
  readonly elements = ELEMENTS;

  constructor() { }

  ngOnInit(): void {
  }

  selectElement(element?: Element) {
    if (element) {
      this.selectedElement = element;
  }
}

}
