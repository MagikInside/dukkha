import { Component, Input, OnInit } from '@angular/core';
import { RoundInfo } from 'src/app/models/round-info.model';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit {

  @Input() roundInfo: RoundInfo | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
