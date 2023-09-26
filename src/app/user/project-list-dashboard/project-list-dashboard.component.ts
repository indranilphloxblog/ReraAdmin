import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectListService} from "../../services/project-list.service";
import {CommonService} from "../../services/common.service";
import {NotifierService} from "angular-notifier";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-list-dashboard',
  templateUrl: './project-list-dashboard.component.html',
  styleUrls: ['./project-list-dashboard.component.css']
})
export class ProjectListDashboardComponent implements OnInit {
  listData: any;
  rolename: any;
  roletype: any = '';
  rejection: string = '';
  daysSubmit = 21;
  fontColor = '';
  selectStatus = 0;
  selectStatus1 = 0;
  statusType = [{'isapproved': 0, 'statusName': 'Under Scrutiny'}, {
    'isapproved': 1,
    'statusName': 'Chairman Approved'
  }, {'isapproved': 2, 'statusName': 'Chairman Rejected'}, {
    'isapproved': 3,
    'statusName': 'HOR Approved'
  }, {'isapproved': 4, 'statusName': 'HOR Rejected'}];
  statusType1 = [{'isapproved': 0, 'statusName': 'Under Scrutiny'}, {'isapproved': 3, 'statusName': 'HOR Approved'}];
  @ViewChild('modal') modal: any;
  workflowtype: number = 1;
  regcount: number = 0;
  extcount: number = 0;
  agentcount: number = 0;
  regprojcount: number = 0
  regusrcount: number = 0
  pendingqprscount: number = 0;
  regproquacount: number = 0;
  regagentquacount: number = 0;
  isProfile: any = 'none';
  totalrevenue: number = 0;
  totalrevenuequater: number = 0;
  agentRenewalCount: number = 0;

  SECRETARY_ROLE_SEQ = '5';
  HOR_ROLE_SEQ = '2';
  CHAIRMAN_ROLE_SEQ = '3';
  SCRUTINY2_ROLE_SEQ = '4';
  SCRUTINY1_ROLE_SEQ = '7';
  MEMBER_ROLE_SEQ = '8';
  INTERN_ROLE_SEQ = '9';
  CEO_ROLE_SEQ = '10';
  hearingcount: number = 0;
  totalcases: number = 0;

  constructor(private notifier: NotifierService, private route: Router, private modalService: NgbModal,
              private apiService: ProjectListService, private common: CommonService,) {
  }

  ngOnInit(): void {
    const uType = sessionStorage.getItem('userid');
    if(uType === null) {
      this.route.navigate(['/login'])
    }
    sessionStorage.removeItem('pid');
    sessionStorage.removeItem('eid');
    sessionStorage.removeItem('aid');

    this.rolename = this.common.getRolename();
    this.roletype = this.common.getRoletype();
    this.common.setWorkflowType(this.workflowtype);
    if(this.roletype === this.CHAIRMAN_ROLE_SEQ || this.roletype === this.MEMBER_ROLE_SEQ) {
      this.generateToken().then(() => {
        // console.log('-----token generated----')
        this.getCGMCount(this.common.HEARING_MENU, this.common.HEARING_GROUP).then((res: any) => {
          this.hearingcount = res;
        })
        this.getCGMCount(this.common.CASE_MENU, this.common.CASE_GROUP).then((res: any) => {
          this.totalcases = res;
        })
      });
    }
    this.fetchProjectDetailsForUserCount(1).then((res: any) => {
      if (res.success) {
        this.regcount = res.response.total;
      } else {
        this.notifier.notify('error', res.message);
      }
    });
    this.fetchProjectDetailsForUserCount(2).then((res: any) => {
      if (res.success) {
        this.extcount = res.response.total;
      } else {
        this.notifier.notify('error', res.message);
      }
    });
    this.fetchProjectDetailsForUserCount(3).then((res: any) => {
      if (res.success) {
        this.agentcount = res.response.total;
      } else {
        this.notifier.notify('error', res.message);
      }
    });
    this.fetchProjectDetailsForUserCount(4).then((res: any) => {
      if (res.success) {
        this.agentRenewalCount = res.response.total;
      } else {
        this.notifier.notify('error', res.message);
      }
    });
    if (this.roletype != this.SCRUTINY1_ROLE_SEQ && this.roletype != this.SCRUTINY2_ROLE_SEQ && this.roletype != this.CEO_ROLE_SEQ && this.roletype != this.INTERN_ROLE_SEQ) {
      this.fetchProjectRegisterCount(4).then((res: any) => {
        if (res.success) {
          this.regprojcount = res.response.total;
        } else {
          this.notifier.notify('error', res.message);
        }
      });

      this.fetchProjectRegisterCount(5).then((res: any) => {
        if (res.success) {
          this.regusrcount = res.response.total;
        } else {
          this.notifier.notify('error', res.message);
        }
      });

      this.fetchProjectRegisterCount(6).then((res: any) => {
        if (res.success) {
          this.pendingqprscount = res.response.total;
        } else {
          this.notifier.notify('error', res.message);
        }
      });
    }

    if (this.roletype != this.SCRUTINY2_ROLE_SEQ && this.roletype != this.SCRUTINY2_ROLE_SEQ && this.roletype != this.HOR_ROLE_SEQ && this.roletype != this.SECRETARY_ROLE_SEQ && this.roletype != this.CEO_ROLE_SEQ && this.roletype != this.INTERN_ROLE_SEQ) {
      this.fetchProjectRegisterCount(7).then((res: any) => {
        if (res.success) {
          this.regproquacount = res.response.total;
        } else {
          this.notifier.notify('error', res.message);
        }
      });
      this.fetchProjectRegisterCount(8).then((res: any) => {
        if (res.success) {
          this.regagentquacount = res.response.total;
        } else {
          this.notifier.notify('error', res.message);
        }
      });

      this.fetchRevenue(1).then((res: any) => {
        if (res.success) {
          this.totalrevenue = res.response.total;
        } else {
          this.notifier.notify('error', res.message);
        }
      });
      this.fetchRevenue(2).then((res: any) => {
        if (res.success) {
          this.totalrevenuequater = res.response.total;
        } else {
          this.notifier.notify('error', res.message);
        }
      });
    }
  }

  generateToken() {
    return new Promise<void>((resolve, reject) => {
      this.apiService.generateToken(sessionStorage.getItem('un')).subscribe((res: any) => {
        if (res.success) {
          const cgmtoken = res.details.token;
          this.common.setCGMToken(cgmtoken);
          const cgmuserid = JSON.parse(atob(cgmtoken.split('.')[1])).id;
          this.common.setCGMUserid(cgmuserid);
          resolve()
        } else {
          reject()
        }
      }, (err: any) => {
        reject()
      })
    })
  }

  getCGMCount(menuid: number, groupid: number) {
    return new Promise<void>((resolve, reject) => {
      this.apiService.getDynamicMenuTicketDtls_new({
        userid: this.common.getCGMId(),
        range: -1,
        menuid: menuid,
        groupid: groupid,
        pagesize:1,
        offset:0
      }).subscribe((res: any) => {
        if (res.success) {
          resolve(res.details.totalData[0].count)
        } else {
          reject()
        }
      }, (err: any) => {
        reject()
      })
    })
  }

  fetchProjectDetailsForUserCount(type: number) {
    let promise = new Promise((resolve, reject) => {
      const data = {
        reraid: this.common.getReraId(),
        roleid: this.common.getRoleId(),
        userid: this.common.getUserId(),
        // status: this.selectStatus1,
        type: type
      };
      this.common.loaderStart();
      this.apiService.fetchProjectDetailsForUserCount(data).subscribe((res: any) => {
        this.common.loaderEnd();
        resolve(res)
      }, (err: any) => {
        this.common.loaderEnd();
        reject()
      })
    });
    return promise;
  }

  fetchProjectRegisterCount(type: number) {
    let promise = new Promise((resolve, reject) => {
      const data = {
        reraid: this.common.getReraId(),
        roleid: this.common.getRoleId(),
        userid: this.common.getUserId(),
        // status: this.selectStatus1,
        type: type
      };
      this.common.loaderStart();
      this.apiService.fetchProjectRegisterCount(data).subscribe((res: any) => {
        this.common.loaderEnd();
        resolve(res)
      }, (err: any) => {
        this.common.loaderEnd();
        reject()
      })
    });
    return promise;
  }


  fetchRevenue(type: number) {
    let promise = new Promise((resolve, reject) => {
      const data = {
        reraid: this.common.getReraId(),
        roleid: this.common.getRoleId(),
        userid: this.common.getUserId(),
        // status: this.selectStatus1,
        type: type
      };
      this.common.loaderStart();
      this.apiService.fetchRevenue(data).subscribe((res: any) => {
        this.common.loaderEnd();
        resolve(res)
      }, (err: any) => {
        this.common.loaderEnd();
        reject()
      })
    });
    return promise;
  }

  changeRouting(type: number) {
    this.workflowtype = type;
    this.common.setWorkflowType(this.workflowtype);
    this.route.navigate(['/user/projectList']);
  }

  changeRoute(type: number) {
    this.common.setTileType(type);
    this.route.navigate(['/user/registerProjectList']);
  }

  profileDetail() {
    if (this.isProfile === 'none') {
      this.isProfile = 'block'
    } else {
      this.isProfile = 'none'
    }
  }

  openCgm(number: string) {
    sessionStorage.setItem('cm',number);
    this.route.navigate(['/user/cgmlist']);
  }

  goTo(path: string) {
    this.route.navigate([path])
  }
}
