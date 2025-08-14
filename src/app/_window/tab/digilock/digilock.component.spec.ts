import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigilockComponent } from './digilock.component';

describe('DigilockComponent', () => {
  let component: DigilockComponent;
  let fixture: ComponentFixture<DigilockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigilockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigilockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
