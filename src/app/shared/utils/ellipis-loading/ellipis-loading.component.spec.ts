import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipisLoadingComponent } from './ellipis-loading.component';

describe('EllipisLoadingComponent', () => {
  let component: EllipisLoadingComponent;
  let fixture: ComponentFixture<EllipisLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EllipisLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipisLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
