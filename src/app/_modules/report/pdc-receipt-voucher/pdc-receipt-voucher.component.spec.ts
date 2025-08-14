import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdcReceiptVoucherComponent } from './pdc-receipt-voucher.component';

describe('PdcReceiptVoucherComponent', () => {
  let component: PdcReceiptVoucherComponent;
  let fixture: ComponentFixture<PdcReceiptVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdcReceiptVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdcReceiptVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
