import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDemoComponent } from './document-demo.component';

describe('DocumentDemoComponent', () => {
  let component: DocumentDemoComponent;
  let fixture: ComponentFixture<DocumentDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
