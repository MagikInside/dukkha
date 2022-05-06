import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
export class QuestionComponent implements OnInit {

  @Input() name = '';
  @Input() options: Option[] = [];
  answer: number | null = null;
  @Output () answerChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onAnswerChange(option: MatButtonToggleChange) {
    this.answerChange.emit(option.value);
  }

}
