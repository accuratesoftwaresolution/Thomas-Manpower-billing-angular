import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkMasterComponent } from './remark-master.component';

describe('RemarkMasterComponent', () => {
  let component: RemarkMasterComponent;
  let fixture: ComponentFixture<RemarkMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarkMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
