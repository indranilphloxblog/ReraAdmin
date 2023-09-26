import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common.service";
import {NotifierService} from "angular-notifier";
import {RegisterListService} from "../../services/register-list.service";
import {ProjectListService} from "../../services/project-list.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-registered-project-list',
  templateUrl: './registered-project-list.component.html',
  styleUrls: ['./registered-project-list.component.css']
})
export class RegisteredProjectListComponent implements OnInit {
  rolename:any = '';
  listData: any = [];
  p: number = 1;
  searchText = '';
  limit = 10;
  offset = 0;
  regNo = '';
  certificateRoot = '';
  totalCount: any = 0;
  pageId = 'server';
  constructor(private common: CommonService, private notifier: NotifierService, private apiService: RegisterListService,
             private route: Router, private config: ConfigService) { }

  ngOnInit(): void {
    this.certificateRoot = this.config.FILE_URL + 'certificate/';
    this.rolename = this.common.getRolename();
    this.getProjectList();
  }

  goToHome() {
    this.route.navigate(['user/dashborad'])
  }

  getProjectList(flag = 0): any {
    if (flag === 1) {
      this.offset = 0;
      this.p = 1;
    }
    const data = {
      searchText: this.searchText,
      regNo: this.regNo,
      limit: this.limit + '',
      offset: this.offset + '',
      reraid: this.common.getReraId(),
      type: 4
    };
    this.apiService.fetchProjectDetails(data).subscribe((res: any) => {
      if (res.success) {
        for(const obj of res.response.resp) {
          obj.approvaltime = this.common.formatDate(obj.approvaltime);
          obj.validatystartdate = this.common.formatDate(obj.validatystartdate);
          obj.validatyenddate = this.common.formatDate(obj.validatyenddate);
        }
        this.listData = res.response.resp;
        this.totalCount = res.response.total;
      }
    })
  }

  pageChange(event: any) {
    this.p = event;
    this.offset = (this.p-1) * this.limit;
    this.getProjectList();
  }

}
