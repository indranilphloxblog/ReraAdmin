import {Component, OnInit, ViewChild} from '@angular/core';
import {RestApiService} from "../../services/rest-api.service";
import {CommonService} from "../../services/common.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-interim-order',
  templateUrl: './interim-order.component.html',
  styleUrls: ['./interim-order.component.css']
})
export class InterimOrderComponent implements OnInit {

  @ViewChild('modal') modal: any;
  modalHeader = '';
  subject = '';
  dateofnotice = '';
  document = '';
  type = '';
  Name_User = '';
  No_OF_ORDER = '0';
  id = 0;
  isUnique = false;
  errMsg = '';
  listData: any = [];
  rolelistData: any = [];
  selectedId = 0;
  selectedPosition = 0;
  fieldTypeDict: any;
  controlTypeDict: any;
  controlTypeKeys: any = [];
  fieldTypeKeys: any = [];
  noticeEdit = {} as any;
  SptgrpSelected = '';
  email = '';
  address = '';
  mobile = '';
  isNextStep = true;
  isPrevStep = false;
  limit = 20;
  offset = 0;
  searchText = '';
  searchType = '';
  startDate = '';
  endDate = '';
  constructor(private modalService: NgbModal, private common: CommonService,
              private notifier: NotifierService, private rest: RestApiService) {
  }

  ngOnInit(): void {
    this.getData()
  }

  openModal(flag = 0): void {
    this.modalHeader = flag === 0 ? 'Add' : 'Update';
    this.modalService.open(this.modal, {centered: true});
    if (flag === 0) {
      this.reset();
    }
  }

  reset(): void {
    this.subject = '';
    this.dateofnotice = '';
    this.No_OF_ORDER = '0';
    this.document = '';
    this.type = '';
  }

  getData(flag = 0): any {
    if (flag === 1) {
      this.offset = 0;
    }
    const data = {
      limit: this.limit + '',
      offset: this.offset + '',
      type: 'Interim orders',
      searchText: this.searchText,
      startDate: this.startDate,
      endDate: this.endDate,
      userId: this.common.getUserId(),
      reraid: this.common.getReraId(),
      orderby: 'id'
    };
    this.common.loaderStart();
    this.rest.getInternListData(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        for(const obj of res.response.data) {
          obj.Date_of_Notice = obj.Date_of_Notice ? this.common.formatDate(obj.Date_of_Notice) : '';
        }
        this.listData = res.response.data;
        this.isNextStep = this.listData.length >= this.limit;
      }
    }, (err: any) => {
      this.common.loaderEnd();
    })

  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  uploadFile(event: any, fileType: any) {
    if (event.target.files.length > 0) {
      const fd = new FormData();
      fd.append('file', event.target.files[0]);
      this.rest.uploadOrderFile(fd).subscribe((res: any) => {
        if (res.success) {
          console.log(res.response);
          this.document = res.response.fileName

        }
      })
    }
  }

  edit(obj: any, pos: number): void {
    this.subject = obj.Subject;
    this.dateofnotice = obj.Date_of_Notice;
    this.document = obj.File_Path;
    this.No_OF_ORDER = obj.No_OF_ORDER;
    this.id = obj.FID;
    this.selectedPosition = pos;
    this.openModal(1);
  }

  openDeleteModal(deleteModal: any, id: number, pos: number): void {
    this.selectedPosition = pos;
    this.selectedId = id;
    this.modalService.open(deleteModal, {centered: true});
  }

  saveData(): any {
    let err = 0;
    this.errMsg = '';
    if (this.subject === '') {
      this.errMsg = 'Please enter the subject';
      err++
    } else if (this.dateofnotice === '') {
      this.errMsg = 'Please enter date of notice';
      err++;
    } else if (this.document == '') {
      this.errMsg = 'Please upload document';
      err++;
    } else if (this.No_OF_ORDER === '') {
      this.errMsg = 'Please select number of order';
      err++
    }

    const data = {
      userid: this.common.getUserId(),
      Subject: this.subject,
      Date_of_Notice: this.dateofnotice,
      No_OF_ORDER: this.No_OF_ORDER + '',
      File_Path: this.document,
      Name_User: 'admin'
    };
    if (err === 0) {
      this.rest.insertInterimData(data).subscribe((res: any) => {
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
    window.open(this.rest.FILE_ROOT + data)
  }

  updateData(): any {
    let err = 0;
    this.errMsg = '';
    if (this.subject === '') {
      this.errMsg = 'Please enter the subject';
      err++
    } else if (this.dateofnotice === '') {
      this.errMsg = 'Please enter date of notice';
      err++;
    } else if (this.document == '') {
      this.errMsg = 'Please upload document';
      err++;
    } else if (this.No_OF_ORDER === '') {
      this.errMsg = 'Please select number of order';
      err++
    }

    const data = {
      userid: this.common.getUserId(),
      id: this.id,
      Subject: this.subject,
      Date_of_Notice: this.dateofnotice,
      File_Path: this.document,
      Name_User: 'admin'
    };
    if (err === 0) {
      this.rest.updateInterimData(data).subscribe((res: any) => {
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

  deleteData(): void {
    const data = {
      id: this.selectedId,
      userid: this.common.getUserId()
    };
    this.rest.deleteInterimData(data).subscribe((res: any) => {
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

  next(): void {
    if (this.isNextStep) {
      this.isPrevStep = true;
      this.offset += this.limit;
      this.getData();
    }
  }

  previous(): void {
    if (this.offset > 0) {
      this.offset = this.offset - this.limit;
      if (this.offset === 0) {
        this.isPrevStep = false;
      }
      this.getData();
    }
  }

}
