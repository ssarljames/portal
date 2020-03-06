import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionItemsComponent } from './transaction-items.component';

describe('TransactionItemsComponent', () => {
  let component: TransactionItemsComponent;
  let fixture: ComponentFixture<TransactionItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
