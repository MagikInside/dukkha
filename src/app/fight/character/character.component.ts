import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Condition } from 'src/app/models/condition.enum';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass']
})
export class CharacterComponent implements OnInit {

  @Input() character: Character | null = null;
  Condition = Condition;

  constructor() { }

  ngOnInit(): void {
  }

}
