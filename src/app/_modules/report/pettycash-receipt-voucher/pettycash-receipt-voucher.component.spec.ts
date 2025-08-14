import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettycashReceiptVoucherComponent } from './pettycash-receipt-voucher.component';

describe('PettycashReceiptVoucherComponent', () => {
  let component: PettycashReceiptVoucherComponent;
  let fixture: ComponentFixture<PettycashReceiptVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PettycashReceiptVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PettycashReceiptVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
