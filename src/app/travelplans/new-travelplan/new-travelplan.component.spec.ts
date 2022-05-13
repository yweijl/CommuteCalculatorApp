import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTravelplanComponent as NewTravelplanComponent } from './new-travelplan.component';

describe('SelectedTravelplansComponent', () => {
  let component: NewTravelplanComponent;
  let fixture: ComponentFixture<NewTravelplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTravelplanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTravelplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
