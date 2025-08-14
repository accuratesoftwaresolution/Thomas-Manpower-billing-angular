import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterCompanyComponent } from './inter-company.component';

describe('InterCompanyComponent', () => {
  let component: InterCompanyComponent;
  let fixture: ComponentFixture<InterCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
