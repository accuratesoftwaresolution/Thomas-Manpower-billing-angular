import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseGroupByProductComponent } from './purchase-group-by-product.component';

describe('PurchaseGroupByProductComponent', () => {
  let component: PurchaseGroupByProductComponent;
  let fixture: ComponentFixture<PurchaseGroupByProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseGroupByProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseGroupByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
