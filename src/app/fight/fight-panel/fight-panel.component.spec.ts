import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightPanelComponent } from './fight-panel.component';

describe('FightPanelComponent', () => {
  let component: FightPanelComponent;
  let fixture: ComponentFixture<FightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
