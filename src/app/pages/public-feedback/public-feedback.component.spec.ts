import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFeedbackComponent } from './public-feedback.component';

describe('PublicFeedbackComponent', () => {
  let component: PublicFeedbackComponent;
  let fixture: ComponentFixture<PublicFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
