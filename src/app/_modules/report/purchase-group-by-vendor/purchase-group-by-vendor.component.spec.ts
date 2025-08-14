import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseGroupByVendorComponent } from './purchase-group-by-vendor.component';

describe('PurchaseGroupByVendorComponent', () => {
  let component: PurchaseGroupByVendorComponent;
  let fixture: ComponentFixture<PurchaseGroupByVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseGroupByVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseGroupByVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
