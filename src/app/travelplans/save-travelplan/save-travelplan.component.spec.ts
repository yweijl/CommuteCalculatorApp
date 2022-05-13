import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTravelplanComponent } from './save-travelplan.component';

describe('SaveTravelplanComponent', () => {
  let component: SaveTravelplanComponent;
  let fixture: ComponentFixture<SaveTravelplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTravelplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTravelplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
