import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedQprListComponent } from './submitted-qpr-list.component';

describe('SubmittedQprListComponent', () => {
  let component: SubmittedQprListComponent;
  let fixture: ComponentFixture<SubmittedQprListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedQprListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedQprListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
