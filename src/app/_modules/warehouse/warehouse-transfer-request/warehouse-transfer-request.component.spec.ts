import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseTransferRequestComponent } from './warehouse-transfer-request.component';

describe('WarehouseTransferRequestComponent', () => {
  let component: WarehouseTransferRequestComponent;
  let fixture: ComponentFixture<WarehouseTransferRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseTransferRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseTransferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
