import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorAttendanceComponent } from './monitor-attendance.component';

describe('MonitorAttendanceComponent', () => {
  let component: MonitorAttendanceComponent;
  let fixture: ComponentFixture<MonitorAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
