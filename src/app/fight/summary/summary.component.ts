import { Component, Input, OnInit } from '@angular/core';
import { Summary } from '../../models/summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit {

  @Input() summary: Summary | null = {round: 2, lastSuccs: 3, lastFails: 2, totalSuccs: 12, totalFails: 10} ;

  constructor() { }

  ngOnInit(): void {
  }

}
