import { Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../services/common.service';
import {NotifierService} from 'angular-notifier';
import {MstProfileFieldsService} from '../../services/mst-profile-fields.service';
import {RestApiService} from '../../services/rest-api.service';

@Component({
  selector: 'app-marquee-controller',
  templateUrl: './marquee-controller.component.html',
  styleUrls: ['./marquee-controller.component.css']
})
export class MarqueeControllerComponent implements OnInit {
  @ViewChild('modal') modal: any;
  modalHeader = '';
  type = '';
  text = '';
  isActive = 1;

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

  openModal(flag: any, marquee: any): void {
    this.modalHeader = flag === 0 ? 'Add' : 'Update';
    if (flag === 1) {
      this.selectedId = marquee.id;
      this.type = marquee.type;
      this.text = marquee.text;
      this.isActive = marquee.isActive;

    }
    this.modalService.open(this.modal, {centered: true})
    if (flag === 0) {
      this.reset();
    }
  }

  reset(): void {
    this.type = '';
    this.text = '';
    this.isActive = 1;
  }

  getData(): any {
    let data = {
      userid: this.common.getUserId()
    }
    this.common.loaderStart();
    this.rest.marqueelist(data).subscribe((res: any) => {
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
    } else if (this.text === '') {
      this.errMsg = 'Please enter the text';
      this.err++
    }

    const data = {
      userid: this.common.getUserId(),
      type: this.type,
      text:this.text,
      isActive: this.isActive
    };

    if (this.err === 0) {
      this.rest.marqueeadd(data).subscribe((res: any) => {
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
    } else if (this.text === '') {
      this.errMsg = 'Please enter the text';
      this.err++
    }

    const data = {
      userid: this.common.getUserId(),
      type: this.type,
      text:this.text,
      isActive: this.isActive,
      id: this.selectedId
    };

    if (this.err === 0) {
      this.rest.marqueeupdate(data).subscribe((res: any) => {
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
      id: this.selectedId
    };
    this.rest.marqueedelete(data).subscribe((res: any) => {
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
