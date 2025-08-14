import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsGroupComponent } from './assets-group.component';

describe('AssetsGroupComponent', () => {
  let component: AssetsGroupComponent;
  let fixture: ComponentFixture<AssetsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
