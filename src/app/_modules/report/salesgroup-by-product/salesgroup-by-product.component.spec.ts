import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesgroupByProductComponent } from './salesgroup-by-product.component';

describe('SalesgroupByProductComponent', () => {
  let component: SalesgroupByProductComponent;
  let fixture: ComponentFixture<SalesgroupByProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesgroupByProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesgroupByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
