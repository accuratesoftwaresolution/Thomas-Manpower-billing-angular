import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AitembrComponent } from './aitembr.component';

describe('AitembrComponent', () => {
  let component: AitembrComponent;
  let fixture: ComponentFixture<AitembrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AitembrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AitembrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
