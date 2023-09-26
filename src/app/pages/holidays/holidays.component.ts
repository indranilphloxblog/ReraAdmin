import { Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../services/common.service';
import {NotifierService} from 'angular-notifier';
import {MstProfileFieldsService} from '../../services/mst-profile-fields.service';
import {RestApiService} from '../../services/rest-api.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  @ViewChild('modal') modal: any;
  modalHeader = '';
  type = '';
  startdate = '';
  enddate = '';
  day = '';
  title = '';
  desc = '';

  err = 0;
  errMsg = '';
  listData: any = [];
  selectedId = 0;
  selectedPosition = 0;

  constructor(private modalService: NgbModal, private apiService: MstProfileFieldsService, private common: CommonService,
              private notifier: NotifierService, private rest: RestApiService) {
  }


  ngOnInit(): void {
    this.getData()
  }

  openModal(flag: any, holiday: any): void {
    this.modalHeader = flag === 0 ? 'Add' : 'Update';
    if (flag === 1) {
      this.selectedId = holiday.id;
      this.type = holiday.type;
      this.startdate = holiday.startdate;
      this.enddate = holiday.enddate;
      this.day = holiday.day;
      this.title = holiday.title;
      this.desc = holiday.description;
    }
    this.modalService.open(this.modal, {centered: true})
    if (flag === 0) {
      this.reset();
    }
  }

  reset(): void {
    this.startdate = '';
    this.enddate = '';
    this.day = '';
    this.title = '';
    this.desc = '';
    this.type = '';
  }

  getData(): any {
    let data = {
      userid: this.common.getUserId()
    }
    this.common.loaderStart();
    this.rest.holidayslist(data).subscribe((res: any) => {
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

  openDeleteModal(deleteModal: any, id: number, pos: number): void {
    this.selectedPosition = pos;
    this.selectedId = id;
    this.modalService.open(deleteModal, {centered: true});
  }

  saveData(): any {
    this.err = 0;
    this.errMsg = '';
    if (this.type === '') {
      this.errMsg = 'Please enter the type';
      this.err++
    } else if (this.type === 'occassion') {
      if (this.startdate === '') {
        this.errMsg = 'Please select start date';
        this.err++;
      }
    } else if (this.type === 'regular') {
      if (this.day === '') {
        this.errMsg = 'Please select day';
        this.err++;
      }
    } else if (this.title === '') {
      this.errMsg = 'Please enter title';
      this.err++
    } else if (this.desc === '') {
      this.errMsg = 'Please enter description';
      this.err++
    }

    const data = {
      userid: this.common.getUserId(),
      type: this.type,
      startdate: this.startdate,
      enddate: this.enddate,
      day: this.day,
      title: this.title,
      desc: this.desc
    };

    if (this.err === 0) {
      this.rest.holidaysadd(data).subscribe((res: any) => {
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
    if (this.type === '') {
      this.errMsg = 'Please enter the type';
      this.err++
    } else if (this.type === 'occassion') {
        this.day = "";
        if (this.startdate === '') {
        this.errMsg = 'Please select start date';
        this.err++;
      }
    } else if (this.type === 'regular') {
        this.startdate = "";
        this.enddate = "";
        if (this.day === '') {
          this.errMsg = 'Please select day';
          this.err++;
      }
    } else if (this.title === '') {
      this.errMsg = 'Please enter title';
      this.err++
    } else if (this.desc === '') {
      this.errMsg = 'Please enter description';
      this.err++
    }

    const data = {
      userid: this.common.getUserId(),
      holidayid: this.selectedId,
      type: this.type,
      startdate: this.startdate,
      enddate: this.enddate,
      day: this.day,
      title: this.title,
      desc: this.desc
    };

    if (this.err === 0) {
      this.rest.holidaysupdate(data).subscribe((res: any) => {
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
      holidayid: this.selectedId
    };
    this.rest.holidaysdelete(data).subscribe((res: any) => {
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
