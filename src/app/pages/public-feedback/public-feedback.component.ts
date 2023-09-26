import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MstProfileFieldsService} from "../../services/mst-profile-fields.service";
import {CommonService} from "../../services/common.service";
import {NotifierService} from "angular-notifier";
import {RestApiService} from "../../services/rest-api.service";

@Component({
  selector: 'app-public-feedback',
  templateUrl: './public-feedback.component.html',
  styleUrls: ['./public-feedback.component.css']
})
export class PublicFeedbackComponent implements OnInit {

  listData: any = [];
  startDate = '';
  endDate = '';
  isNextStep = true;
  isPrevStep = false;
  offset = 0;
  limit = 20;
  currentRate=0
  constructor(private modalService: NgbModal, private apiService: MstProfileFieldsService, private common: CommonService,
              private notifier: NotifierService, private rest: RestApiService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(flag = 0) {
    if(flag === 1) {
      this.offset = 0;
    }
    const data = {
      userid: this.common.getUserId(),
      offset: this.offset + '',
      limit: this.limit + '',
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.common.loaderStart();
    this.rest.getFeedback(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        for(const obj of res.response) {
          obj.createdat = this.common.formatDate(obj.createdat);
        }
        this.listData = res.response;
      } else {
        this.notifier.notify('error', res.message);
      }
    }, (err: any) => {})
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
