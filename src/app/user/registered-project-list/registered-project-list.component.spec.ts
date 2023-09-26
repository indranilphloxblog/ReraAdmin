import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredProjectListComponent } from './registered-project-list.component';

describe('RegisteredProjectListComponent', () => {
  let component: RegisteredProjectListComponent;
  let fixture: ComponentFixture<RegisteredProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
