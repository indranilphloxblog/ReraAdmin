import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MstProfileFieldsService} from "../../services/mst-profile-fields.service";
import {CommonService} from "../../services/common.service";
import {NotifierService} from "angular-notifier";
import {RestApiService} from "../../services/rest-api.service";

@Component({
  selector: 'app-mst-causelist',
  templateUrl: './mst-causelist.component.html',
  styleUrls: ['./mst-causelist.component.css']
})
export class MstCauselistComponent implements OnInit {

  @ViewChild('modal') modal: any;
  modalHeader = '';
  subject = '';
  dateofnotice = '';
  bannarimage = '';
  document = '';
  type = '';
  numberOfOrder = 0;

  isUnique = false;
  errMsg = '';
  listData: any = [];
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

  constructor(private modalService: NgbModal, private apiService: MstProfileFieldsService, private common: CommonService,
              private notifier: NotifierService, private rest: RestApiService) {
  }


  ngOnInit(): void {
    this.getData()
  }

  openModal(flag = 0): void {
    this.modalHeader = flag === 0 ? 'Add' : 'Update';
    this.modalService.open(this.modal, {centered: true});
    if(flag === 0) {
      this.reset();
    }
  }

  reset(): void {
    this.subject = '';
    this.dateofnotice = '';
    this.bannarimage = '';
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
      searchText: this.searchText,
      searchType: this.searchType
    };
    this.common.loaderStart();
    this.rest.causelist(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        for(const obj of res.response) {
          obj.Date_of_Notice = this.common.formatDate(obj.Date_of_Notice);
        }
        this.listData = res.response;
        this.isNextStep = this.listData.length >= this.limit;
      }
    }, (err: any) => {
      this.common.loaderEnd();
    })

  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  uploadFile(event: any, fileType: any = '') {
    if (event.target.files.length > 0) {
      const fd = new FormData();
      fd.append('file', event.target.files[0]);
      this.common.loaderStart();
      this.rest.causeListUploadFile(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.document = res.response.fileName
        }
      }, (err: any) => {
        this.common.loaderEnd();
      })
    }
  }

  edit(obj: any, pos: number): void {
    this.noticeEdit = obj;
    this.subject = obj.Subject;
    this.dateofnotice = obj.Date_of_Notice;
    this.numberOfOrder = obj.No_OF_ORDER;
    this.document = obj.File_Path;
    this.type = obj.Notice_Type;
    this.selectedPosition = pos;
    this.selectedId = obj.FID;
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
    } else if (this.type === '') {
      this.errMsg = 'Please select type';
      err++
    }

    const data = {
      userid: this.common.getUserId(),
      subject: this.subject,
      dateofnotice: this.dateofnotice,
      nooforder: this.numberOfOrder,
      document: this.document,
      type: this.type
    };
    if (err === 0) {
      this.rest.causeadd(data).subscribe((res: any) => {
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
    window.open(this.rest.FILE_URL + 'cause-file/' + data)
  }

  updateData(): any {
    let err = 0;
    this.errMsg = '';
    if (this.subject === '') {
      this.errMsg = 'Please enter the subject';
      err++
    }

    if (this.dateofnotice === '') {
      this.errMsg = 'Please enter date of notice';
      err++;
    }

    if (this.document == '') {
      this.errMsg = 'Please upload document';
      err++;
    }

    if (this.type === '') {
      this.errMsg = 'Please select type';
      err++
    }

    if (this.numberOfOrder + '' === '') {
      this.errMsg = 'Number of order is missing';
      err++
    }

    const data = {
      userid: this.common.getUserId(),
      id: this.noticeEdit.noticeid,
      subject: this.noticeEdit.subject,
      dateofnotice: this.noticeEdit.dateofnotice,
      nooforder: this.noticeEdit.nooforder,
      document: this.noticeEdit.document,
      type: this.noticeEdit.type
    };

    if (err === 0) {
      this.rest.causeupdate(data).subscribe((res: any) => {
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
      id: this.selectedId
    };
    this.rest.causedelete(data).subscribe((res: any) => {
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
