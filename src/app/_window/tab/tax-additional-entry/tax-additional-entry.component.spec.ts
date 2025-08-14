import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAdditionalEntryComponent } from './tax-additional-entry.component';

describe('TaxAdditionalEntryComponent', () => {
  let component: TaxAdditionalEntryComponent;
  let fixture: ComponentFixture<TaxAdditionalEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxAdditionalEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxAdditionalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
