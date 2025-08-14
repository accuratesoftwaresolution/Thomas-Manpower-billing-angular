import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcDetailsComponent } from './lc-details.component';

describe('LcDetailsComponent', () => {
  let component: LcDetailsComponent;
  let fixture: ComponentFixture<LcDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LcDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
