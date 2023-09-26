import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstCauselistComponent } from './mst-causelist.component';

describe('MstCauselistComponent', () => {
  let component: MstCauselistComponent;
  let fixture: ComponentFixture<MstCauselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstCauselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MstCauselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
