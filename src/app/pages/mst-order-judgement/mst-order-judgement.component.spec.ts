import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstOrderJudgementComponent } from './mst-order-judgement.component';

describe('MstOrderJudgementComponent', () => {
  let component: MstOrderJudgementComponent;
  let fixture: ComponentFixture<MstOrderJudgementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstOrderJudgementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MstOrderJudgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
