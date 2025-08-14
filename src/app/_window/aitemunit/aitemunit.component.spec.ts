import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AitemunitComponent } from './aitemunit.component';

describe('AitemunitComponent', () => {
  let component: AitemunitComponent;
  let fixture: ComponentFixture<AitemunitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AitemunitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AitemunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
