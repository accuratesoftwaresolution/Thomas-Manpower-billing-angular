import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsMasterComponent } from './alerts-master.component';

describe('AlertsMasterComponent', () => {
  let component: AlertsMasterComponent;
  let fixture: ComponentFixture<AlertsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertsMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
