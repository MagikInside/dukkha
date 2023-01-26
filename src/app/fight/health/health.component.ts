import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.sass']
})
export class HealthComponent implements OnChanges  {
  @Input() health: number = 0;
  @Input() wounds: number = 0;
  healthArray: string[] = [];

  ngOnChanges({health, wounds}: SimpleChanges) {
   if((health.currentValue && health.currentValue !==health.previousValue) || (wounds.currentValue && wounds.currentValue !== wounds.previousValue)) {
    this.healthArray = Array(health.currentValue - wounds.currentValue).fill('♥').concat(Array(wounds.currentValue).fill('💔'));
   }
  }

}
