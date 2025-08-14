import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStartingNumberComponent } from './document-starting-number.component';

describe('DocumentStartingNumberComponent', () => {
  let component: DocumentStartingNumberComponent;
  let fixture: ComponentFixture<DocumentStartingNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentStartingNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentStartingNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
