import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrologComponent } from './prolog.component';

describe('PrologComponent', () => {
  let component: PrologComponent;
  let fixture: ComponentFixture<PrologComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrologComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
