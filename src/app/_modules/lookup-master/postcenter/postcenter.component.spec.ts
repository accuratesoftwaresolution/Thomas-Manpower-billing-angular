import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcenterComponent } from './postcenter.component';

describe('PostcenterComponent', () => {
  let component: PostcenterComponent;
  let fixture: ComponentFixture<PostcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
