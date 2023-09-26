import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterimOrderComponent } from './interim-order.component';

describe('InterimOrderComponent', () => {
  let component: InterimOrderComponent;
  let fixture: ComponentFixture<InterimOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterimOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterimOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
