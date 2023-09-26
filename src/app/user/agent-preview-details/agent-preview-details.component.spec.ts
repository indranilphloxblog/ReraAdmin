import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPreviewDetailsComponent } from './agent-preview-details.component';

describe('AgentPreviewDetailsComponent', () => {
  let component: AgentPreviewDetailsComponent;
  let fixture: ComponentFixture<AgentPreviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentPreviewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPreviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
