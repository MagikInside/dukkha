import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionDisplayComponent } from './selection-display.component';

describe('SelectionComponent', () => {
  let component: SelectionDisplayComponent;
  let fixture: ComponentFixture<SelectionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
