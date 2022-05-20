import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCharacterComponent } from './selected-character.component';

describe('SelectedCharacterComponent', () => {
  let component: SelectedCharacterComponent;
  let fixture: ComponentFixture<SelectedCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
