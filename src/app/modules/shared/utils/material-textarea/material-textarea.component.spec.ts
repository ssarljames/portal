import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTextareaComponent } from './material-textarea.component';

describe('MaterialTextareaComponent', () => {
  let component: MaterialTextareaComponent;
  let fixture: ComponentFixture<MaterialTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
