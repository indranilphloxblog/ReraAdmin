import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RestApiService} from "../../../services/rest-api.service";
import {CommonService} from "../../../services/common.service";
import {NotifierService} from "angular-notifier";
import {Router} from "@angular/router";

@Component({
  selector: 'app-submitted-qpr-list',
  templateUrl: './submitted-qpr-list.component.html',
  styleUrls: ['./submitted-qpr-list.component.css']
})
export class SubmittedQprListComponent implements OnInit, OnChanges {
  listData: any = [];
  rolename: any = '';
  roletype: any = '';
  limit = 10;
  offset = 0;
  totalCount = 0;
  page = 1;
  searchText = '';
  regNo = '';
  @Input() issubmited = -1;
  @Input() pageId = '';
  constructor(private notifier: NotifierService, private router: Router,
     private modalService: NgbModal, private rest: RestApiService,
      private common: CommonService,
    ) {
    }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    if (this.issubmited != -1) {
      this.rolename = this.common.getRolename();
      this.roletype = this.common.getRoletype();
      this.getAllSubmittedQuarterList();
    }
  }

  getAllSubmittedQuarterList(flag = 0) {
    if(flag === 1) {
      this.offset = 0;
      this.page = 1;
    }
    const data = {
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
      offset: this.offset,
      limit: this.limit,
      searchText: this.searchText,
      regNo: this.regNo,
      issubmited: this.issubmited
    };
    this.common.loaderStart();
    this.rest.getAllSubmittedQuarterList(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        for(const obj of res.response.data) {
          obj.financialYear = this.common.calculateFinancialYear(obj.quoterenddate);
          if(this.issubmited == 1) {
            const d = new Date(obj.quoterenddate);
            d.setDate(d.getDate() + 15);
            obj.delay = this.common.subDates(obj.submitteddate, d);
            obj.delay = obj.delay < 0 ? Math.abs(obj.delay) : 0
            obj.submitteddate = this.common.formatDate(obj.submitteddate);
          }
        }
        this.listData = res.response.data;
        if (this.offset === 0) {
          this.totalCount = res.response.totalCount;
        }
      }
    });
  }

  pageChange(event: any) {
    this.page = event;
    this.offset = (this.page-1) * this.limit;
    this.getAllSubmittedQuarterList();
  }

  goToProjectExecutionDtl(obj: any): void {
    const quoterName = obj.quoterName + ' ' + obj.quoterenddate.split('-')[0]
    obj.quoterNameYear = quoterName;
    sessionStorage.setItem('qdtl', JSON.stringify(obj));
    this.router.navigate(['/user/qpr-details'])
  }

}
