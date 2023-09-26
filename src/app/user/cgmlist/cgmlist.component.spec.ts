import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgmlistComponent } from './cgmlist.component';

describe('CgmlistComponent', () => {
  let component: CgmlistComponent;
  let fixture: ComponentFixture<CgmlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgmlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgmlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
