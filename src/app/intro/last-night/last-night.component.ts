import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Answers } from 'src/app/models/answers.model';
import { FACTIONS } from 'src/app/models/factions';
import { QUESTIONS } from 'src/app/models/questions';
import { Option } from '../../models/option.model';

@Component({
  selector: 'app-last-night',
  templateUrl: './last-night.component.html',
  styleUrls: ['./last-night.component.sass']
})
export class LastNightComponent implements OnInit {
  
  @Input() step = 0;
  @Output() answerChange = new EventEmitter<Answers>();
  @Input() answers: Answers = [];
  
  questions = QUESTIONS;
  
  
  factions = FACTIONS;

  selectedFaction = this.factions[0];
  selectedFocus: Option | null = null;
  
  strategy = '';
  factionLead = '';
  vanguardFaction = '';
  fallenDistrict = '';
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  selectFaction(faction: {name:string, img: string, active: boolean, description: string}) {
    this.selectedFaction.active = false;
    faction.active = true;
    this.selectedFaction = faction;
  }
  
  onAnswerChange(answer: number, question: number) {
    const newAnswers = [...this.answers];
    newAnswers[question] = answer;
    this.answerChange.emit(newAnswers);
  }
  
}
