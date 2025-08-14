import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiplineComponent } from './shipline.component';

describe('ShiplineComponent', () => {
  let component: ShiplineComponent;
  let fixture: ComponentFixture<ShiplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
