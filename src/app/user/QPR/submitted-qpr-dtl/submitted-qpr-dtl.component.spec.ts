import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedQprDtlComponent } from './submitted-qpr-dtl.component';

describe('SubmittedQprDtlComponent', () => {
  let component: SubmittedQprDtlComponent;
  let fixture: ComponentFixture<SubmittedQprDtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedQprDtlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedQprDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
