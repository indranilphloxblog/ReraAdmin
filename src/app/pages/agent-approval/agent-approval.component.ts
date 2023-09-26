import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CommonService} from "../../services/common.service";
import {NotifierService} from "angular-notifier";
import {RestApiService} from "../../services/rest-api.service";

@Component({
  selector: 'app-agent-approval',
  templateUrl: './agent-approval.component.html',
  styleUrls: ['./agent-approval.component.css']
})
export class AgentApprovalComponent implements OnInit {
  searchText = '';
  isLoading = false;
  searchProjectList: any = [];
  projectList: any = [];
  projectid = 0;
  promoterid = 0;
  isExecution = '0';
  registrationNo = '';
  validityStartDate = '';
  validityEndDate = '';
  certificate = '';
  isSubmitBtnDisable = true;
  limit=10;
  offset=0;
  agentListSearch = '';
  isNextStep = true;
  isPrevStep = false;
  constructor(private modalService: NgbModal, private common: CommonService,
              private notifier: NotifierService, private rest: RestApiService) {
  }

  ngOnInit(): void {
    this.fetchAgentList();
  }

  fetchAgentList(flag = 0) {
    if(flag === 1) {
      this.offset = 0;
    }
    const data = {
      userid: this.common.getUserId(),
      reraid: this.common.getReraId(),
      searchText: this.agentListSearch,
      limit: this.limit + '',
      offset: this.offset + ''
    };
    this.rest.fetchAgentList(data).subscribe((res: any) => {
      if(res.success) {
        console.log(res)
        this.projectList = res.response;
      }
    })
  }

  next(): void {
    if (this.isNextStep) {
      this.isPrevStep = true;
      this.offset += this.limit;
      this.fetchAgentList();
    }
  }

  previous(): void {
    if (this.offset > 0) {
      this.offset = this.offset - this.limit;
      if (this.offset === 0) {
        this.isPrevStep = false;
      }
      this.fetchAgentList();
    }
  }

  searchProject() {
    if(this.searchText.trim().length >=3) {
      const data = {
        reraid: this.common.getReraId(),
        userid: this.common.getUserId(),
        searchText: this.searchText
      };
      this.isLoading = true;
      this.rest.searchByAgentName(data).subscribe((res: any) => {
        this.isLoading = false;
        if (res.success) {
          console.log(res)
          this.searchProjectList = res.response;
        }
      })
    }
  }

  onProjectSelect(event: any) {
    for(const obj of this.searchProjectList) {
      if (obj.userid == this.searchText) {
        this.searchText = obj.username;
        this.projectid = obj.userid;
        this.promoterid = obj.particularprofileid;
        this.isExecution = obj.isapproved === 3 ? '1' : '0';
        this.registrationNo = obj.registrationno;
        this.isSubmitBtnDisable = false;
        break;
      }
    }
  }

  uploadCertificate(event: any) {
    // certificateUpload
    if (event.target.files.length > 0) {
      const fd = new FormData();
      fd.append('file', event.target.files[0]);
      this.common.loaderStart();
      this.rest.certificateUpload(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.certificate = res.response.fileName
        }
      }, (err: any) => {
        this.common.loaderEnd();
      })
    }
  }

  viewCertificate(certificate: string) {
    window.open(this.rest.FILE_URL + 'certificate/' + certificate, '_blank');
  }

  openSubmitModal(submitAlert: any): any {
    if (this.registrationNo === '') {
      this.notifier.notify('error', 'Registration No is required');
      return false;
    } else if (this.isExecution === '0') {
      this.notifier.notify('error', 'Please Select Type');
      return false;
    } else if (this.validityStartDate === '') {
      this.notifier.notify('error', 'validity start date is required');
      return false;
    } else if (this.validityEndDate === '' && this.isExecution != '2') {
      this.notifier.notify('error', 'validity end date is required');
      return false;
    } else if (this.certificate === '') {
      this.notifier.notify('error', 'certificate is required');
      return false;
    }
    this.modalService.open(submitAlert, {centered: true, backdrop: "static"})
  }

  submit(): any {
    const data = {
      reraid: this.common.getReraId(), 
      userid: this.common.getUserId(),
      agentid: this.projectid,
      validityStartDate: this.validityStartDate,
      validityEndDate: this.validityEndDate,
      certificate: this.certificate,
      registrationno: this.registrationNo,
      statusType: this.isExecution
    };
    this.common.loaderStart();
    this.rest.updateAgentStatus(data).subscribe((res: any) => {
      this.common.loaderEnd();
      this.closeModal();
      console.log(data)
      console.log(res)
      if(res.success) {
        this.notifier.notify('success', res.message);
        this.reset();
      } else {
        this.notifier.notify('error', res.message);
      }
    }, (err: any) => {
      this.common.loaderEnd();
      this.closeModal();
    })
  }

  reset() {
    this.isSubmitBtnDisable= true;
    this.searchProjectList = [];
    this.projectid = 0;
    this.promoterid = 0;
    this.isExecution = '0';
    this.registrationNo = '';
    this.validityStartDate = '';
    this.validityEndDate = '';
    this.certificate = '';
    this.searchText = '';
    const certfile: any = document.getElementById('certfile');
    if(certfile) {
      certfile.value = '';
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }


}
