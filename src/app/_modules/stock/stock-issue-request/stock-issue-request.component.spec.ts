import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockIssueRequestComponent } from './stock-issue-request.component';

describe('StockIssueRequestComponent', () => {
  let component: StockIssueRequestComponent;
  let fixture: ComponentFixture<StockIssueRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockIssueRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIssueRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
