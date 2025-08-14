import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKeyComponent } from './user-key.component';

describe('UserKeyComponent', () => {
  let component: UserKeyComponent;
  let fixture: ComponentFixture<UserKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
