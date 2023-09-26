import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RestApiService} from "../../../services/rest-api.service";
import {CommonService} from "../../../services/common.service";
import {NotifierService} from "angular-notifier";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-submitted-qpr-dtl',
  templateUrl: './submitted-qpr-dtl.component.html',
  styleUrls: ['./submitted-qpr-dtl.component.css']
})
export class SubmittedQprDtlComponent implements OnInit {

  name = '';
  projectId = 0;
  quoterId = 0;
  projectuid: any = '';
  stepList: any = [];
  formDetailsList: any = [];
  selectedBuildingInfo: any = [];
  selectedTabIndex = 0;
  selectedBuilding = 0;
  selectedBuildingForPhoto = 0;
  projectDetails: any = {
    projectuid: '',
    projectName: '',
    projectAddress: '',
    promoterName: '',
    copromoterName: '',
    validatyenddate: '',
    projectStartDate: '',
    projectType: '',
    periodOfValidityDate: ''
  };
  FILE_ROOT = '';
  signatureFile = '';
  submitPersonName = '';
  isAcceptDeclaration = false;
  tabList: any = ['Booking Update', 'Construction Progress Update', 'Common Amenities Update', 'Photographs', 'Financial Update', 'Legal & Miscellaneous'];
  inventoryData: any = {
    building: [],
    commercial: [],
    garage: []
  };
  quoterName: any = '';
  buildingList: any = [];
  constructionProgressList: any = [];
  financialDetails: any = {
    projectaccountno: '014725836900147',
    estimatedcost: '',
    amtrecquoter: '',
    actiualcost: '',
    netamount: '',
    totalexpenditure: '',
    mortgagecharge: ''
  };
  isFinance = true;
  allSubmit = true;
  financialUpdateId = 0;
  saledeed = '' as any;
  saleagreement = '' as any;
  legalCase: any = [{caseno: '', partyname: ''}];
  commonAmenities: any = [];
  buildingPhotoList: any = [];
  isSubmitted = true;
  quarterStartMonth = 0;
  quarterEndMonth = 0;
  quarterYear = 0;
  photoParticulars: any = [];
  selectedBuildingDtlForPhoto: any;
  particularId = '';
  fullscreenImage = '';
  userId = '';
  rolename: any = '';
  isolddata = 0;
  progressDtl: any = [];

  constructor(private rest: RestApiService, private common: CommonService, private activeRoute: ActivatedRoute,
              private modalService: NgbModal, private notifier: NotifierService, private router: Router) {
    this.FILE_ROOT = this.rest.FILE_ROOT;
  }

  ngOnInit(): void {
    this.rolename = this.common.getRolename();
    const d = sessionStorage.getItem('qdtl');
    if (d) {
      const obj = JSON.parse(d);
      this.isolddata = obj.isolddata;
      this.name = '';
      this.projectId = Number(obj.projectid);
      this.quoterId = Number(obj.id);
      this.quoterName = obj.quoterNameYear;
      this.userId = obj.userid;
      this.quarterYear = Number(this.quoterName.split(' ')[this.quoterName.split(' ').length - 1]);
      this.getProjectDetail();
      if(this.isolddata == 1) {
        this.getOldQPRDetails();
      } else {
        this.getInventoryData();
        setTimeout(() => {
          this.getFinancial_details();
          this.getLegalCase();
        }, 20);
      }
    }
  }

  onlyNumber(event: any): boolean {
    if (((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) || event.keyCode == 8 || event.keyCode == 190 || event.keyCode == 110) {
      return true;
    } else {
      return false;
    }
  }

  goToProfile(): void {
    this.router.navigate(['/pages/profile-details'])
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  getProjectDetail() {
    this.common.loaderStart();
    const data = {
      userid: this.common.getUserId(),
      reraid: this.common.getReraId(),
      projectid: this.projectId,
      quoterid: this.quoterId,
      promoterid: this.userId
    };
    this.rest.getProjectDetail(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        if (res.response.validatyenddate) {
          res.response.validatyenddate = this.common.formatDate(res.response.validatyenddate);
        }
        this.projectDetails = res.response;
        if (res.response.quarterDtl) {
          this.quarterStartMonth = res.response.quarterDtl.startmonth;
          this.quarterEndMonth = res.response.quarterDtl.endmonth;
        }
      }
    }, (err: any) => {
      this.common.loaderEnd()
    });
  }

  getOldQPRDetails(): any {
    this.rest.getOldQPRDetails({
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
      promoterid: this.userId,
      projectid: this.projectId,
      executionhdrid: this.quoterId
    }).subscribe((res: any) => {
      if (res.success) {
          this.progressDtl = res.response;
      }
    })
  }

  onTabChange(event: any) {
    if (event.index === 1) {
      if (this.buildingList.length === 0) {
        this.getBuildingListOfProject('construct');
      } else if (this.constructionProgressList.length === 0) {
        this.selectedBuilding = this.buildingList[0].buildingName;
        this.getConstructionDetails(this.buildingList[0]);
      }
    } else if (event.index === 2) {
      if (this.commonAmenities.length === 0) {
        this.getAmenitiesDetails();
      }
    } else if (event.index === 3) {
      if (this.buildingList.length === 0) {
        this.getBuildingListOfProject('photograph');
      } else if (this.buildingPhotoList.length === 0) {
        this.selectedBuildingForPhoto = this.buildingList[0].buildingName;
        this.selectedBuildingDtlForPhoto = this.buildingList[0];
        this.getBuildingPhotograph();
      }
      if (this.photoParticulars.length === 0) {
        this.getPhotoParticulars();
      }
    }
  }

  goToPrevTab(): void {
    this.selectedTabIndex -= 1;
  }

  goToNext() {
    this.selectedTabIndex += 1;
  }

  getInventoryData() {
    const data = {
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
      projectid: this.projectId,
      quoterid: this.quoterId,
      promoterid: this.userId
    };
    this.rest.getInventoryData(data).subscribe((res: any) => {
      if (res.success) {
        this.inventoryData = res.response;
      }
    })
  }

  getBuildingListOfProject(type: string = 'construct'): any {
    this.common.loaderStart();
    const data = {
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
      projectid: this.projectId,
      promoterid: this.userId,
    };
    this.rest.getBuildingListOfProject(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.buildingList = res.response;
        if (this.buildingList.length > 0) {
          if (type === 'construct') {
            this.selectedBuilding = this.buildingList[0].buildingName;
            this.getConstructionDetails(this.buildingList[0]);
          } else if (type === 'photograph') {
            this.selectedBuildingForPhoto = this.buildingList[0].buildingName;
            this.selectedBuildingDtlForPhoto = this.buildingList[0];
            this.getBuildingPhotograph();
          }
        }
      }
    })
  }

  onBuildingChange(building: any) {
    this.getConstructionDetails(building);
  }

  onCustomDateSelect(event: any, fieldObj: any) {
    fieldObj.estimate_completion = event;
  }

  getConstructionDetails(buildingDtl: any) {
    this.common.loaderStart();
    const data = {
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
      projectid: this.projectId,
      quoterid: this.quoterId,
      groupid: buildingDtl.groupid,
      fieldid: buildingDtl.fieldid,
      groupposition: buildingDtl.groupposition,
      type: 'construct',
      promoterid: this.userId
    };
    this.rest.getConstructionProgress(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        for (const obj of res.response) {
          obj.isDisable = this.common.isDateMaxThanToday(obj.enddate, 0);
          obj.perErr = '';
          obj.resonErr = '';
          obj.cmpdErr = '';
          this.validateWorkProgress(obj);
        }
        this.constructionProgressList = res.response;
      }
    })
  }


  getFinancial_details() {
    this.common.loaderStart();
    const data = {
      userid: this.common.getUserId(),
      quoterid: this.quoterId,
      projectid: this.projectId,
      promoterid: this.userId
    };
    this.rest.getFinancial_details(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.isFinance = false;
        this.financialUpdateId = res.response.financialUpdateId;
        this.financialDetails = {
          projectaccountno: res.response.projectaccountno,
          estimatedcost: res.response.estimatedcost,
          amtrecquoter: res.response.amtrecquoter,
          actiualcost: res.response.actiualcost,
          netamount: res.response.netamount,
          totalexpenditure: res.response.totalexpenditure,
          mortgagecharge: res.response.mortgagecharge
        }
      }
    }, (err: any) => {
      this.common.loaderEnd()
    });
  }

  addMoreCases() {
    this.legalCase.push({caseno: '', partyname: ''});
  }

  removeItem(i: number) {
    if (this.legalCase.length > 1) {
      this.legalCase.splice(i, 1);
    }
  }

  uploadFile(event: any, type: string): any {
    if (event.target.files.length > 0) {
      const fileSize = event.target.files[0].type.indexOf('pdf') > -1 ? 10485760 : 2097152;
      if (event.target.files[0].size > fileSize) {
        this.notifier.notify('error', 'File size limit exceeds.');
        return false;
      }
      const fd = new FormData();
      fd.append('file', event.target.files[0]);
      this.rest.uploadFile(fd).subscribe((res: any) => {
        if (res.success) {
          if (type === 'Sale Deed') {
            this.saledeed = res.response.fileName;
          } else if (type === 'Agreement for Sale') {
            this.saleagreement = res.response.fileName;
          } else if (type === 'signature') {
            this.signatureFile = res.response.fileName;
          }
        } else {
          this.notifier.notify('error', res.message);
        }
      })
    }
  }

  getLegalCase(): any {
    this.common.loaderStart();
    const data = {
      userid: this.common.getUserId(),
      quoterid: this.quoterId,
      projectid: this.projectId,
      promoterid: this.userId
    };
    this.rest.getLegalCase(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        if (res.response.legalResp.length > 0) {
          this.legalCase = res.response.legalResp;
        }
        if (res.response.saleResp.length > 0) {
          this.saledeed = res.response.saleResp[0].saledeed;
          this.saleagreement = res.response.saleResp[0].saleagreement
        }
        if (res.response.hdrResp.length > 0) {
          this.isSubmitted = res.response.hdrResp[0].issubmited === 1;
          this.isAcceptDeclaration = this.isSubmitted;
          this.signatureFile = res.response.hdrResp[0].signature;
          this.submitPersonName = res.response.hdrResp[0].submitedpersonname
        }


      }
    }, (err: any) => {
      this.common.loaderEnd()
    });
  }

  openLink(file: any) {
    window.open(this.FILE_ROOT + file, '_blank');
  }

  getAmenitiesDetails() {
    this.common.loaderStart();
    const data = {
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
      projectid: this.projectId,
      quoterid: this.quoterId,
      groupid: '',
      fieldid: '',
      groupposition: '',
      type: 'amenity',
      promoterid: this.userId
    };
    this.rest.getConstructionProgress(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        for (const obj of res.response) {
          obj.isDisable = this.common.isDateMaxThanToday(obj.enddate, 0);
          obj.perErr = '';
          obj.resonErr = '';
          obj.cmpdErr = '';
          this.validateWorkProgress(obj);
        }
        this.commonAmenities = res.response;
      }
    })
  }

  onBuildingChangeForPhoto(building: any) {
    this.selectedBuildingDtlForPhoto = building;
    this.getBuildingPhotograph();
  }

  validateWorkProgress(obj: any) {
    const month = Number(obj.enddate.split('-')[0]);
    const year = Number(obj.enddate.split('-')[1]);
    if (obj.work_done !== null && obj.work_done !== '') {
      obj.isDisable = !(this.quarterYear === year && (month >= this.quarterStartMonth && month <= this.quarterEndMonth) && Number(obj.work_done) !== 100);
    }
  }

  getPhotoParticulars(): any {
    this.rest.getPhotoParticulars().subscribe((res: any) => {
      if (res.success) {
        this.photoParticulars = res.response;
      }
    })
  }

  getBuildingPhotograph(): any {
    const data = {
      reraid: this.common.getReraId(),
      userid: this.common.getUserId(),
      projectid: this.projectId,
      executionhdrid: this.quoterId,
      groupid: this.selectedBuildingDtlForPhoto.groupid,
      groupposition: this.selectedBuildingDtlForPhoto.groupposition,
      promoterid: this.userId
    };
    this.common.loaderStart();
    this.rest.getBuildingPhotograph(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.buildingPhotoList = res.response;
      }
    })
  }

  closeFullScreenView() {
    const element = <HTMLElement>document.getElementById('fullscrn');
    if (element) {
      element.classList.add('hide-elem');
      this.fullscreenImage = '';
    }
  }

  showFullScreenView() {
    const element = <HTMLElement>document.getElementById('fullscrn');
    if (element) {
      element.classList.remove('hide-elem');
    }
  }

  showImageFullScreen(imageName: string) {
    this.fullscreenImage = this.FILE_ROOT + imageName;
    this.showFullScreenView()
  }

}
