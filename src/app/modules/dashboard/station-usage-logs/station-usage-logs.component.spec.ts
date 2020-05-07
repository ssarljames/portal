import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationUsageLogsComponent } from './station-usage-logs.component';

describe('StationUsageLogsComponent', () => {
  let component: StationUsageLogsComponent;
  let fixture: ComponentFixture<StationUsageLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationUsageLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationUsageLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
