import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReceiptVoucherComponent } from './stock-receipt-voucher.component';

describe('StockReceiptVoucherComponent', () => {
  let component: StockReceiptVoucherComponent;
  let fixture: ComponentFixture<StockReceiptVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockReceiptVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReceiptVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
