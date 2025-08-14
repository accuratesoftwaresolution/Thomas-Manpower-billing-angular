import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBankBookComponent } from './cash-bank-book.component';

describe('CashBankBookComponent', () => {
  let component: CashBankBookComponent;
  let fixture: ComponentFixture<CashBankBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashBankBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBankBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
