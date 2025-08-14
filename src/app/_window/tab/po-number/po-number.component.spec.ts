import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoNumberComponent } from './po-number.component';

describe('PoNumberComponent', () => {
  let component: PoNumberComponent;
  let fixture: ComponentFixture<PoNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
