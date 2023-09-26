import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../services/common.service';
import { NotifierService } from 'angular-notifier';
import { MstWorkflowStepsRoleService } from 'src/app/services/mst-workflow-steps-role.service';

@Component({
  selector: 'app-mst-workflow-steps-role',
  templateUrl: './mst-workflow-steps-role.component.html',
  styleUrls: ['./mst-workflow-steps-role.component.css']
})
export class MstWorkflowStepsRoleComponent implements OnInit {
  @ViewChild('modal') modal: any;
  modalHeader = '';
  fstepworkname = '';
  tstepworkname = '';
  selectedId = 0;
  selectedPosition = 0;
  errMsg = '';
  listData: any = [];
  businessTypeList: any = [];
  workflowList: any = []
  workflowStepList: any = [];
  stepList: any = [];
  rolelists: any = [];
  workflowid = '';
  stepid = '';
  selectedRoleid = '';
  stepworkid = ''
  workflowName = '';
  stepname = '';
  selectedRolename = '';
  constructor(private modalService: NgbModal, private apiService: MstWorkflowStepsRoleService, private common: CommonService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getworkflowid();
    this.getworkflowstepid();
    this.getroles();
    this.getList();
  }

  getList(): void {
    const data = {
      userid: this.common.getUserId(),
      reraid: this.common.getReraId()
    }
    this.common.loaderStart();
    this.apiService.getList(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.response) {
        this.listData = res.response;
      }
    }, (err: any) => {
      this.common.loaderEnd();
    })
  }

  getworkflowid(): void {
    const data = {
      userid: this.common.getUserId(),
      reraid: this.common.getReraId()
    }
    this.common.loaderStart();
    this.apiService.getworkflowid(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.response) {
        this.workflowList = res.response;
      }
    }, (err: any) => {
      this.common.loaderEnd();
    })
  }

  getworkflowstepid(): void {
    const data = {
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
    }
    this.common.loaderStart();
    this.apiService.getworkflowstepid(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.response) {
        this.workflowStepList = res.response;
      }
    }, (err: any) => {
      this.common.loaderEnd();
    })
  }

  getroles(): void {
    const data = {
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
    }
    this.common.loaderStart();
    this.apiService.getRole(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.response) {
        this.rolelists = res.response;
      }
    }, (err: any) => {
      this.common.loaderEnd();
    })
  }

  getstepid(): void {
    const data = {
      reraid: this.common.getReraId(),
      workflowid: this.workflowid,
      userid: this.common.getUserId(),
    }
    this.common.loaderStart();
    this.apiService.getstepid(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.response) {
        this.stepList = res.response;
      }
    }, (err: any) => {
      this.common.loaderEnd();
    })
  }

  openModal(flag = 0): void {
    this.modalHeader = flag === 0 ? 'Add' : 'Update';
    this.modalService.open(this.modal, { centered: true })
    if (this.modalHeader === 'Add') {
      this.reset()
    }
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  onWorkflowChange() {
    for (let i = 0; i < this.workflowList.length; i++) {
      if (this.workflowList[i].id == this.workflowid) {
        this.workflowName = this.workflowList[i].workflowname;
      }
    }
    this.getstepid();
  }

  stepChange() {
    for (let i = 0; i < this.workflowStepList.length; i++) {
      if (this.workflowStepList[i].id == this.stepid) {
        this.stepname = this.workflowStepList[i].stepname;
      }
    }
  }

  roleChange() {
    for (let i = 0; i < this.rolelists.length; i++) {
      if (this.rolelists[i].roleid == this.selectedRoleid) {
        this.selectedRolename = this.rolelists[i].roledesc;
      }
    }
  }

  onStepNameChange() {
    for (let i = 0; i < this.stepList.length; i++) {
      if (this.stepList[i].id == this.stepworkid) {
        this.fstepworkname = this.stepList[i].fromstepname;
        this.tstepworkname = this.stepList[i].tostepname;
      }
    }
  }

  saveData(): any {
    this.errMsg = '';
    if (this.workflowid === '') {
      this.errMsg = 'Please enter the wrokflow name';
      return false;
    }

    if (this.stepid === '') {
      this.errMsg = 'Please enter the step name';
      return false;
    }

    if (this.stepworkid === '') {
      this.errMsg = 'Please enter the step work name';
      return false;
    }

    if (this.selectedRoleid === '') {
      this.errMsg = 'Please enter the role name';
      return false;
    }

    const data = {
      reraid: this.common.getReraId(),
      workflowid: this.workflowid,
      stepid: this.stepid,
      workflowstepsworksid: this.stepworkid,
      roleid: this.selectedRoleid,
      userid: this.common.getUserId()
    };
    // console.log(JSON.stringify(data));
    this.apiService.addData(data).subscribe((res: any) => {
      if (res.success) {
        this.getList();
        this.closeModal();
        this.reset();
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }

  reset(): void {
    this.workflowid = '';
    this.workflowName = '';
    this.stepid = '';
    this.stepname = '';
    this.stepworkid = '';
    this.fstepworkname = '';
    this.tstepworkname = '';
    this.selectedRoleid = '';
    this.selectedRolename = '';
  }

  edit(obj: any, pos: number): void {
    this.stepList = []
    this.selectedPosition = pos;
    this.selectedId = obj.id;
    this.workflowid = obj.workflowid;
    this.workflowName = obj.workflowname;
    this.stepid = obj.stepid;
    this.stepname = obj.stepname;
    this.stepworkid = obj.workflowstepsworksid;
    this.getstepid();
    this.fstepworkname = obj.fromstepname;
    this.tstepworkname = obj.tostepname
    this.selectedRoleid = obj.roleid;
    this.selectedRolename = obj.roledesc;
    this.openModal(1);
  }

  updateData(): any {
    this.errMsg = '';
    if (this.workflowid === '') {
      this.errMsg = 'Please enter the wrokflow name';
      return false;
    }

    if (this.stepid === '') {
      this.errMsg = 'Please enter the stape name';
      return false;
    }

    if (this.stepworkid === '') {
      this.errMsg = 'Please enter the stape work name';
      return false;
    }

    if (this.selectedRoleid === '') {
      this.errMsg = 'Please enter the role name';
      return false;
    }

    const data = {
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
      id: this.selectedId,
      workflowid: this.workflowid,
      stepid: this.stepid,
      workflowstepsworksid: this.stepworkid,
      roleid: this.selectedRoleid,
    };
    this.apiService.updateData(data).subscribe((res: any) => {
      if (res.success) {
          this.listData[this.selectedPosition].workflowid = this.workflowid,
          this.listData[this.selectedPosition].workflowname = this.workflowName,
          this.listData[this.selectedPosition].stepid = this.stepid,
          this.listData[this.selectedPosition].stepname = this.stepname,
          this.listData[this.selectedPosition].workflowstepsworksid = this.stepworkid,
          this.listData[this.selectedPosition].fromstepname = this.fstepworkname;
          this.listData[this.selectedPosition].tostepname = this.tstepworkname;
          this.listData[this.selectedPosition].roleid = this.selectedRoleid,
          this.listData[this.selectedPosition].roledesc = this.selectedRolename,
          this.closeModal();
        this.notifier.notify('success', res.message);
        this.reset();
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }

  openDeleteModal(deleteModal: any, id: number, pos: number): void {
    this.selectedPosition = pos;
    this.selectedId = id;
    this.modalService.open(deleteModal, { centered: true });
  }

  deleteData(): void {
    const data = {
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
      id: this.selectedId
    };
    this.apiService.deleteData(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.closeModal();
        this.listData.splice(this.selectedPosition, 1);
      } else {
        this.notifier.notify('error', res.message);
        this.closeModal();
      }
    })
  }

}
