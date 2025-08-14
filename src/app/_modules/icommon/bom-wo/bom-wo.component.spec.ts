import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomWoComponent } from './bom-wo.component';

describe('BomWoComponent', () => {
  let component: BomWoComponent;
  let fixture: ComponentFixture<BomWoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BomWoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BomWoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
