import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmBusinessPartnerComponent } from './crm-business-partner.component';

describe('CrmBusinessPartnerComponent', () => {
  let component: CrmBusinessPartnerComponent;
  let fixture: ComponentFixture<CrmBusinessPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmBusinessPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmBusinessPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
