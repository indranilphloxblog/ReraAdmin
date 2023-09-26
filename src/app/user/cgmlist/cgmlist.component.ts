import {Component, OnInit} from '@angular/core';
import {NotifierService} from "angular-notifier";
import {Router} from "@angular/router";
import {ProjectListService} from "../../services/project-list.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-cgmlist',
  templateUrl: './cgmlist.component.html',
  styleUrls: ['./cgmlist.component.css']
})
export class CgmlistComponent implements OnInit {
  details: any[] = [];
  rolename: any = '';
  p: number = 1;
  limit: number = 10;
  projectSize: number = 10;
  projectPage: number = 1;
  offset:number=0;
  private menu: any;
  private groupid: any;
  nextoffset: number=0;
  totalpage: number=0;
  previousoffset: number=0;
  currentpage: number=0;
  CHAIRMAN_ROLE_SEQ = '3';
  SCRUTINY2_ROLE_SEQ = '4';
  SCRUTINY1_ROLE_SEQ = '7';
  MEMBER_ROLE_SEQ = '8';
  roletype: any = '';
  constructor(private notifier: NotifierService, private route: Router,
              private apiService: ProjectListService, private common: CommonService) {
  }

  ngOnInit(): void {
    this.rolename = this.common.getRolename();
    this.menu = this.common.getCGMMenu();
    this.roletype = this.common.getRoletype();
    this.groupid = 0;
    if (this.menu == this.common.CASE_MENU) {
      this.groupid = this.common.CASE_GROUP
    } else {
      this.groupid = this.common.HEARING_GROUP
    }
    if(this.roletype === this.CHAIRMAN_ROLE_SEQ || this.roletype === this.MEMBER_ROLE_SEQ) {
      this.getCGMCount(this.menu, this.groupid).then((res: any) => {
        // console.log(res.dataObj.length)
        this.details = res.dataObj;
        this.projectSize = res.totalData[0].count;
        this.nextoffset = res.nextOffset;
        this.previousoffset = res.previousOffset;
        this.totalpage = res.totalPage;
        this.currentpage = 1;
      })
    }
    // this.getCGMCount(434, 440).then((res: any) => {
    //   this.totalcases = res;
    // })
  }

  getCGMCount(menuid: number, groupid: number) {
    return new Promise<void>((resolve, reject) => {
      this.common.loaderStart();
      this.apiService.getDynamicMenuTicketDtls_new({
        userid: this.common.getCGMId(),
        range: -1,
        menuid: menuid,
        groupid: groupid,
        pagesize: this.limit,
        offset: this.offset
      }).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {

          resolve(res.details)
        } else {
          reject()
        }
      }, (err: any) => {
        this.common.loaderEnd();
        reject()
      })
    })
  }


  previous() {
    this.offset=this.previousoffset;
    this.getCGMCount(this.menu, this.groupid).then((res: any) => {
      this.details = res.dataObj;
      this.currentpage--;
      this.nextoffset=res.nextOffset;
      this.previousoffset=res.previousOffset;
    })
  }

  next() {
    this.offset=this.nextoffset;
    this.getCGMCount(this.menu, this.groupid).then((res: any) => {
      this.details = res.dataObj;
      this.currentpage++;
      this.nextoffset=res.nextOffset;
      this.previousoffset=res.previousOffset;
    })
  }
}
