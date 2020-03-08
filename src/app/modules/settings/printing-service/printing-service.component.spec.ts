import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingServiceComponent } from './printing-service.component';

describe('PrintingServiceComponent', () => {
  let component: PrintingServiceComponent;
  let fixture: ComponentFixture<PrintingServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintingServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
