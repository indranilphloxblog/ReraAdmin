import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueeControllerComponent } from './marquee-controller.component';

describe('MarqueeControllerComponent', () => {
  let component: MarqueeControllerComponent;
  let fixture: ComponentFixture<MarqueeControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarqueeControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
