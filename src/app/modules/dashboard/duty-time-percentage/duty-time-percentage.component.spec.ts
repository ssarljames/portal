import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyTimePercentageComponent } from './duty-time-percentage.component';

describe('DutyTimePercentageComponent', () => {
  let component: DutyTimePercentageComponent;
  let fixture: ComponentFixture<DutyTimePercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyTimePercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyTimePercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
