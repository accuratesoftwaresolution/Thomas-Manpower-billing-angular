import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesgroupByCustomerComponent } from './salesgroup-by-customer.component';

describe('SalesgroupByCustomerComponent', () => {
  let component: SalesgroupByCustomerComponent;
  let fixture: ComponentFixture<SalesgroupByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesgroupByCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesgroupByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
