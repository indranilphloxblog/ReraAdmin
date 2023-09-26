import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsPreviewComponent } from './project-details-preview.component';

describe('ProjectDetailsPreviewComponent', () => {
  let component: ProjectDetailsPreviewComponent;
  let fixture: ComponentFixture<ProjectDetailsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailsPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
