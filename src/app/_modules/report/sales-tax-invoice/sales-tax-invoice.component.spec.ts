import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTaxInvoiceComponent } from './sales-tax-invoice.component';

describe('SalesTaxInvoiceComponent', () => {
  let component: SalesTaxInvoiceComponent;
  let fixture: ComponentFixture<SalesTaxInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesTaxInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTaxInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
