import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateApprovalComponent } from './certificate-approval.component';

describe('CertificateApprovalComponent', () => {
  let component: CertificateApprovalComponent;
  let fixture: ComponentFixture<CertificateApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
