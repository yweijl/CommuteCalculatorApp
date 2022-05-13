import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTravelplansComponent } from './user-travelplans.component';

describe('UserTravelplansComponent', () => {
  let component: UserTravelplansComponent;
  let fixture: ComponentFixture<UserTravelplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTravelplansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTravelplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
