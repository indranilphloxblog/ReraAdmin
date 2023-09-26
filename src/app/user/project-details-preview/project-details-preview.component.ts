import { Component, OnInit } from '@angular/core';
import {RestApiService} from "../../services/rest-api.service";
import {Router} from "@angular/router";
import {NgxPrintElementService} from "ngx-print-element";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-project-details-preview',
  templateUrl: './project-details-preview.component.html',
  styleUrls: ['./project-details-preview.component.css']
})
export class ProjectDetailsPreviewComponent implements OnInit {
  stepListShow: any = [];
  formDetails: any = [];
  FILE_ROOT: any;
  fullscreenImage: any = '';
  paymentDetails = {
    payment_type: '',
    mode: '',
    statuscode: '',
    statusdesc: '',
    bank_name: '',
    branch_name: '',
    dd_check_no: '',
    currencyName: '',
    orderid: '',
    transactionno: ''
  }

  isAccept: boolean = true;
  signatureImg = '';
  totalAmount = 1;
  isPreventRegistration: boolean = false;
  isDataBlank: boolean = false;
  totalLandArea:any=0;
  constructor(private common: CommonService, private rest: RestApiService, public print: NgxPrintElementService,
              private router: Router) {
    this.FILE_ROOT = this.rest.FILE_ROOT;
  }

  ngOnInit(): void {
    this.stepListShow = this.common.stepListShow;
    this.formDetails = this.common.formDetails;
    this.signatureImg = this.common.signatureImg;
    this.isAccept = this.common.isAccept

    if (this.common.totalAmount != '') {
      this.totalAmount = this.common.totalAmount
    }

    if(this.common.paymentdetails != null) {
      this.paymentDetails = this.common.paymentdetails;
    }

    // this.isPreventRegistration = this.common.isPreventRegistration
    this.isDataBlank = this.common.isDataBlank
    this.totalLandArea = this.common.totalLandArea
    if (this.stepListShow.length == 0 && this.formDetails.length == 0) {
      history.back()
    }
    // })
  }

  numberInWords(number: number) {
    return this.common.numberInWords(number + '');
  }

  openLink(file: any) {
    window.open(this.FILE_ROOT + file, '_blank');
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

  openGoogleMaps(pos = -1) {
    let long: any = '';
    let lat: any = '';
    if (pos === -1) {
      try {
        long = (<HTMLInputElement>document.getElementById('Geo_Location_Lon')).value;
      } catch {
        if (long === undefined || long === null || long === '') {
          try {
            long = (<HTMLInputElement>document.getElementById('Geographic_Other_Location')).value;
          } catch (e) {
            long = null
          }
        }
      }
      lat = (<HTMLInputElement>document.getElementById('Geographic_Location')).value;
    } else {
      lat = (<HTMLInputElement>document.getElementById('sLatitude_table_fiels_' + pos)).value;
      long = (<HTMLInputElement>document.getElementById('sLongitude_' + pos)).value;
    }
    if (long && lat) {
      window.open('https://www.google.com/maps/search/?api=1&query=' + lat + ',' + long, '_blank');
    }
  }

  closeFullScreenView() {
    const element = <HTMLElement>document.getElementById('fullscrn');
    if (element) {
      element.classList.add('hide-elem');
      this.fullscreenImage = '';
    }
  }

  back(){
    this.common.redirectTab = 'payment';
    this.router.navigate([this.common.redirectURL]);
  }

}
