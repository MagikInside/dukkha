import { Component, Input, OnInit } from '@angular/core';
import { Phase } from 'src/app/models/phases.model';

@Component({
  selector: 'app-phase-display',
  templateUrl: './phase-display.component.html',
  styleUrls: ['./phase-display.component.sass']
})
export class PhaseDisplayComponent implements OnInit {

  @Input() phases: Phase[] | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
