import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitAndLoseAccComponent } from './profit-and-lose-acc.component';

describe('ProfitAndLoseAccComponent', () => {
  let component: ProfitAndLoseAccComponent;
  let fixture: ComponentFixture<ProfitAndLoseAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitAndLoseAccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitAndLoseAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
