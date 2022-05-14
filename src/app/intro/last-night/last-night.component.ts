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
  focusOptions: Option[] = [
    {name: 'Meditation' , description: 'Close your eyes. Concentrate. Search in your inner thougts.', longDesc: 'You were a blue mage. You decide to seek guidance in meditation. You burn some incense, sit on the floor, close your eyes, and focus your will on the questions that lie in wait for you.'},
    {name: 'Praying' , description: 'Ask the Gods for guide, for help.', longDesc: 'You were a white mage. You draw on divine inspiration. You light some candles around you and kneel, beseeching the gods to enlighten you with their wisdom.'},
    {name: 'Reading', description: 'Search in old arcane books for answers.', longDesc: 'You were a red mage. You search through the dusty tomes of arcane knowledge that had belonged to another Mage years ago, trying to decipher answers among runes, glyphs and inscriptions, in lenghty texts and intelligible annotations.'},
    {name: 'Sacrifice', description: 'Any knowledge demands a prize. In blood .', longDesc: "You were a black mage. You don't have time for contemplation, so with a heavy heart, you claim your old neighbor's poor cat. You spill his blood with an accurate cut, and with it you draw a pentacle on the ground, while demanding answers from the dark beings in the shadows." }, 
  ];
  selectedFocus: Option | null = null;
  
  focus: number | null = null;
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
