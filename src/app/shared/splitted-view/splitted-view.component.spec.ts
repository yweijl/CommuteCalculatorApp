import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplittedViewComponent } from './splitted-view.component';

describe('SplittedViewComponent', () => {
  let component: SplittedViewComponent;
  let fixture: ComponentFixture<SplittedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplittedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplittedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
