import { Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../services/common.service';
import {NotifierService} from 'angular-notifier';
import {MstProfileFieldsService} from '../../services/mst-profile-fields.service';
import {RestApiService} from '../../services/rest-api.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  @ViewChild('modal') modal: any;
  modalHeader = '';
  name = '';
  startdate = '';
  enddate = '';
  reason = '';
  applicationid = '';

  searchText = '';
  isLoading = false;
  searchProjectList:any = [];

  err = 0;
  errMsg = '';
  listData: any = [];
  selectedId = '';
  selectedPosition = 0;

  constructor(private modalService: NgbModal, private apiService: MstProfileFieldsService, private common: CommonService,
              private notifier: NotifierService, private rest: RestApiService) {
  }


  ngOnInit(): void {
    this.getData()
  }

  openModal(flag: any, application: any): void {
    this.modalHeader = flag === 0 ? 'Add' : 'Update';
    if (flag === 1) {
      this.applicationid = application.id;
      this.selectedId = application.userid;
      this.name = application.username;
      this.startdate = application.startdate;
      this.enddate = application.enddate;
      this.reason = application.reason;      
      this.searchProjectList = []
  }
    this.modalService.open(this.modal, {centered: true})
    if (flag === 0) {
      this.reset();
    }
  }

  reset(): void {
    this.selectedId = '';
    this.name = '';
    this.startdate = '';
    this.enddate = '';
    this.reason = '';
    this.searchProjectList = []
  }

  getData(): any {
    let data = {
      userid: this.common.getUserId()
    }
    this.common.loaderStart();
    this.rest.leaveslist(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.listData = res.response;
      }
    }, (err: any) => {
      console.log(err)
      this.common.loaderEnd();
    })

  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  openDeleteModal(deleteModal: any, id: string, pos: number): void {
    this.selectedPosition = pos;
    this.applicationid = id;
    this.modalService.open(deleteModal, {centered: true});
  }

  saveData(): any {
    this.err = 0;
    this.errMsg = '';
    if (this.selectedId === '') {
      this.errMsg = 'Please select User ID';
      this.err++
    } else if (this.name === '') {
      this.errMsg = 'Please Enter name';
      this.err++
    } else if (this.startdate === '') {
      this.errMsg = 'Please select Start Date';
      this.err++
    } else if (this.reason === '') {
      this.errMsg = 'Please Enter reason';
      this.err++
    } 

    const data = {
      userid: this.common.getUserId(),
      id : this.selectedId,
      name: this.name,
      startdate: this.startdate,
      enddate: this.enddate,
      reason: this.reason
    };

    if (this.err === 0) {
      this.rest.leavesadd(data).subscribe((res: any) => {
        if (res.success) {
          this.closeModal();
          this.notifier.notify('success', res.message);
          this.reset();
          this.getData();
        } else {
          this.notifier.notify('error', res.message);
        }
      });
    }
  }

  updateData() {
    this.err = 0;
    this.errMsg = '';
    if (this.selectedId === '') {
      this.errMsg = 'Please select User ID';
      this.err++
    } else if (this.name === '') {
      this.errMsg = 'Please Enter name';
      this.err++
    } else if (this.startdate === '') {
      this.errMsg = 'Please select Start Date';
      this.err++
    } else if (this.reason === '') {
      this.errMsg = 'Please Enter reason';
      this.err++
    } 

    const data = {
      userid: this.common.getUserId(),
      applicationid: this.applicationid,
      id : this.selectedId,
      name: this.name,
      startdate: this.startdate,
      enddate: this.enddate,
      reason: this.reason
    };

    if (this.err === 0) {
      this.rest.leavesupdate(data).subscribe((res: any) => {
        if (res.success) {
          this.closeModal();
          this.notifier.notify('success', res.message);
          this.reset();
          this.getData();
        } else {
          this.notifier.notify('error', res.message);
        }
      });
    }

  }

  openTab(data: any) {
    window.open(this.rest.NEWS_ROOT + data)
  }

  
  deleteData(): void {
    const data = {
      userid: this.common.getUserId(),
      applicationid: this.applicationid
    };
    this.rest.leavesdelete(data).subscribe((res: any) => {
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

  searchProject() {
    if(this.selectedId.trim().length >0) {
      const data = {
        userid: this.common.getUserId(),
        id : this.selectedId,
      };
      this.isLoading = true;
      this.rest.fetchusers(data).subscribe((res: any) => {
        this.isLoading = false;
        if (res.success) {
          this.searchProjectList = res.response;
        }
      })
    } 
  }

  onProjectSelect(event: any) {
    for(const obj of this.searchProjectList) {
      if (obj.userid == this.selectedId) {
        this.name = obj.username;
        break;
      }
    }
  }

}
