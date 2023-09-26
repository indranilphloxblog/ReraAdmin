import { Component, OnInit } from '@angular/core';
import {CommonService} from 'src/app/services/common.service';
import {RestApiService} from 'src/app/services/rest-api.service';
import {NgxPrintElementService} from 'ngx-print-element';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agent-preview-details',
  templateUrl: './agent-preview-details.component.html',
  styleUrls: ['./agent-preview-details.component.css']
})
export class AgentPreviewDetailsComponent implements OnInit {
  isComplete = 0
  formDetails: any;
  stepList: any = [];
  stepListShow: any = [];
  entytyType = '';
  entytyType1: any;
  isSubmitted = false;
  stateName: any = [];
  stateList: any = [];
  cityName: any = [];
  loginUserAddress: any = ''
  backupDetails: any = [];
  FILE_ROOT = '';
  isAccept: boolean = true
  signatureImg = '';
  paymentAmount = 10000;
  disablefieldsidlist: any = ['Enter_Aadhaar_OTP', 'Enter_Mobile_Otp', 'Enter_Mobile_Otp_Proprietor'];
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
  };

  constructor(private common: CommonService, private rest: RestApiService,  private router: Router, public print: NgxPrintElementService,) {
      this.FILE_ROOT = this.rest.FILE_ROOT;
  }

  ngOnInit(): void {
      if (this.common.getEntityTypeId() == 1) {
          this.paymentAmount = 10000;
      } else {
          this.paymentAmount = 50000;
      }


      this.stepListShow = this.common.stepListShow;

      this.formDetails = this.common.formDetails;
      this.paymentDetails = this.common.paymentdetails;
      setTimeout(() => {
          this.hiddenFieldList(this.disablefieldsidlist)
      })

      this.signatureImg = this.common.signatureImg


      if (this.stepListShow.length == 0 && this.formDetails.length == 0) {
          history.back()

      }
  }

  hiddenFieldList(fieldList: any) {

      for (const field of fieldList) {
          try {
              const elems: any = document.querySelectorAll('[id^="' + field + '"]');
              for (let i = 0; i < elems.length; i++) {
                  elems[i].hidden = true;
              }
          } catch (e) {
          }
      }
  }

  openLink(file: any) {
      window.open(this.FILE_ROOT + file, '_blank');
  }

  back() {
    this.common.redirectTab = 'declaration';
      history.back()
  }

//   printDiv(divName: any) {

//     var printContents = (<HTMLInputElement>document.getElementById(divName)).innerHTML;
//     var originalContents = document.body.innerHTML;

//     document.body.innerHTML = printContents;

//     window.print();

//     document.body.innerHTML = originalContents;
// }
}
