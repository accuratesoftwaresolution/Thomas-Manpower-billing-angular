import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityReservationComponent } from './quantity-reservation.component';

describe('QuantityReservationComponent', () => {
  let component: QuantityReservationComponent;
  let fixture: ComponentFixture<QuantityReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
