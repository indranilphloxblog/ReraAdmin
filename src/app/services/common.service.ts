import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  stepListShow:any = [];
  formDetails:any = [];
  signatureImg:any = '';
  paymentdetails:any;
  redirectTab = '';
  totalAmount:any = '';
  isDataBlank:boolean=false;
  totalLandArea:any = '';
  isAccept = false;
  redirectURL = '';


  HEARING_MENU = 442;
  CASE_MENU = 434;
  HEARING_GROUP = 447;
  CASE_GROUP = 440;
  PAYLOAD_ENC_DEC = "2e35f242a46d67eeb74aabc37d5e5d05";
  fieldTypeDict: any = {
    '1': 'Text',
    '2': 'Integer',
    '3': 'Float',
    '4': 'Date',
    '5': 'File',
    '6': 'Button',
    '7': 'Heading',
    '8': 'Label',
    '9': 'Is Approved',
    '10': 'HR',
    '11': 'Blank Space',
    '12': 'Image',
    '13': 'Table Heading'
  };
  controlTypeDict: any = {
    '1': 'Text',
    '2': 'Combo',
    '3': 'Radio',
    '4': 'Checkbox',
    '5': 'Date',
    '6': 'File',
    '7': 'Button',
    '8': 'Heading',
    '9': 'Textarea',
    '10': 'Label',
    '11': 'Is Approved',
    '12': 'Radio with Value',
    '13': 'HR',
    '14': 'Blank Space',
    '15': 'Image',
    '16': 'Table Heading',
    '17': 'Multi Select'
  };
  regmobile = /^[6789][0-9]{9}$/
  promotersType = ['Director', 'Proprietor', 'Society', 'Partnership', 'llp', 'Trustee', 'Member', 'Authorised'];
  yearList: any = [];
  modalSubject = new Subject<any>();
  forgotPasswordObj: any = {
    panno: '',
    userid: 0,
    verifyid: 0,
    roleid: '0'
  };

  constructor(private spinner: NgxSpinnerService, private router: Router) {
  }

  getEntityId(): any {
    return 1
  }

  numberInWords(num: string) {
    const a = ['', 'First ', 'Second ', 'Third ', 'Fourth ', 'Fifth ', 'Sixth ', 'Seventh ', 'Eighth ', 'Ninth ', 'Tenth ', 'Eleventh ', 'Twelfth ', 'Thirteenth ', 'Fourteenth ', 'Fifteenth ', 'Sixteenth ', 'Seventeenth ', 'Eighteenth ', 'Nineteenth '];
    const b = ['', '', 'twenty ', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    let n: any = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' ' : '';
    return str;
  }

  getEntityTypeId(): any {
    const entityTypeId = sessionStorage.getItem('entitytypeid');
    if (entityTypeId) {
      return JSON.parse(entityTypeId);
    } else {
      return null;
    }
  }

  getUserId(): any {
    const userId = sessionStorage.getItem('userid');
    if (userId) {
      return JSON.parse(userId)
    } else {
      return null;
    }
  }

  setProjectId(data: any) {
    sessionStorage.setItem("pid", data);
  }

  setExtensionId(data: any) {
    sessionStorage.setItem("eid", data);
  }

  setAgentId(data: any) {
    sessionStorage.setItem("aid", data);
  }

  setRenewalId(data: any) {
    sessionStorage.setItem("rid", data);
  }

  setWorkflowType(data: any) {
    sessionStorage.setItem("wtp", data);
  }
  setCGMToken(data: any) {
    sessionStorage.setItem("cgmtoken", data);
  }
  setCGMUserid(data: any) {
    sessionStorage.setItem("cgmid", data);
  }

  setMenuType(data: any) {
    sessionStorage.setItem("mid", data)
  }

  getMenuType() {
    return sessionStorage.getItem("mid")
  }

  setEntityTypeId(data: any) {
    sessionStorage.setItem('entitytypeid', data)
  }

  getProjectId() {
    return sessionStorage.getItem('pid')
  }

  getExtensionId() {
    return sessionStorage.getItem('eid');
  }

  getAgentId() {
    return sessionStorage.getItem('aid');
  }

  getRenewalId() {
    return sessionStorage.getItem('rid');
  }

  getWorkflowType() {
    let val = sessionStorage.getItem('wtp');
    if (val === null) {
      return 0
    } else {
      return JSON.parse(val)
    }
  }
  getCGMId() {
    let val = sessionStorage.getItem('cgmid');
    if (val === null) {
      return 0
    } else {
      return JSON.parse(val)
    }
  }
  getCGMToken() {
    let val = sessionStorage.getItem('cgmtoken');
    if (val === null) {
      return ''
    } else {
      return val
    }
  }

  getToken(): any {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  clearUserData() {
    sessionStorage.clear();
  }

  formatDate(date: any, flag = 0) {
    let d = flag === 0 ? new Date(date) : date,
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  encryptPayload(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.PAYLOAD_ENC_DEC).toString();
  }

  decryptPayload(data: any) {
    /*const bytes = await CryptoJS.AES.decrypt(data, this.PAYLOAD_ENC_DEC);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));*/
    return JSON.parse(CryptoJS.AES.decrypt(data, this.PAYLOAD_ENC_DEC.trim()).toString(CryptoJS.enc.Utf8));
  }

  setUserData(data: any): any {
    sessionStorage.setItem('userid', data.userid);
    sessionStorage.setItem('reraid', data.reraid);
    sessionStorage.setItem('roleid', data.roleid);
    sessionStorage.setItem('name', data.username);
    sessionStorage.setItem('role', data.roledesc);
    sessionStorage.setItem('tp', data.roletype);
    sessionStorage.setItem('un', data.useremail);
  }

  getReraId(): any {
    const reraId = sessionStorage.getItem('reraid');
    if (reraId) {
      return JSON.parse(reraId)
    } else {
      return null;
    }
  }

  setTileType(data: any) {
    sessionStorage.setItem("tile", data);
  }

  getTileType() {
    let val = sessionStorage.getItem('tile');
    if (val === null) {
      return 0
    } else {
      return JSON.parse(val)
    }
  }
  getCGMMenu() {
    let val = sessionStorage.getItem('cm');
    if (val === null) {
      return 0
    } else {
      return JSON.parse(val)
    }
  }

  getRoleId(): any {
    const roleid = sessionStorage.getItem('roleid');
    if (roleid) {
      return JSON.parse(roleid)
    } else {
      return null;
    }
  }
  isBlankField(data:any) {
    let isBlank = false;
    const keys = Object.keys(data);
    // console.log(JSON.stringify(keys));
    for (let i = 0; i < keys.length; i++) {
      let stringVal;
      let numberVal;
      if (typeof data[keys[i]] === 'string') {
        stringVal = data[keys[i]].trim();
      }
      if (typeof data[keys[i]] === 'number') {
        numberVal = data[keys[i]];
      }
      if (stringVal === '' || numberVal === 0) {
        isBlank = true;
        break;
      }

    }
    return isBlank;
  }
  getUsername() {
    return sessionStorage.getItem('name');
  }

  getRolename() {
    return sessionStorage.getItem('role');
  }

  getRoletype() {
    return sessionStorage.getItem('tp');
  }

  // getUserName(): any {
  //   const name = sessionStorage.getItem('name');
  //   if (name) {
  //     return name;
  //   } else {
  //     return null;
  //   }
  // }
  getNumber() {
    return sessionStorage.getItem('mobile');
  }

  loaderStart(): void {
    this.spinner.show();
  }

  loaderEnd(): void {
    this.spinner.hide();
  }

  isLoggedIn(): any {
    const uType = sessionStorage.getItem('userid')
    if (uType) {
      const roleId = this.getRoleId()
      if (roleId != null && roleId != 1 && roleId != 11) {
        this.router.navigate(['/user']);
      } else if (roleId == 1 || roleId == 11) {
        this.router.navigate(['/mst']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  groupBy(xs: any, key: any) {
    return xs.reduce(function (rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  getDeviceId() {
    let navigator_info = window.navigator;
    let screen_info = window.screen;
    let uid: any = navigator_info.mimeTypes ? navigator_info.mimeTypes.length : '2';
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins ? navigator_info.plugins.length : '5';
    uid += screen_info.height.toString() || '';
    uid += screen_info.width.toString() || '';
    uid += screen_info.pixelDepth.toString() || '';
    return uid;
  }

  sortKeyAsFirst(firstArr: any, secondArr: any) {
    const newArr = [];
    for (const elem of firstArr) {
      if (secondArr.includes(elem)) {
        newArr.push(elem);
      }
    }
    return newArr;
  }

  checkParentFieldValue(fieldParentValues: any, fieldValue: string, flag: number = 1): boolean {
    if (flag === 1) {
      return fieldParentValues !== null ? fieldParentValues.split(',').includes(fieldValue) : false;
    } else {
      return fieldParentValues !== null ? !fieldParentValues.split(',').includes(fieldValue) : false;
    }
  }

  validMobile(obj: any, groupId: any) {
    const fieldValue = groupId === 0 ? obj.fielddetails.fieldvalue : obj.fieldvalue;
    if (!this.regmobile.test(fieldValue) && fieldValue != '') {
      return false
    } else {
      return true
    }
  }

  subDates(date: any, anotherDate: any = ''): any {
    const date1 = new Date(date);
    const date2 = anotherDate === '' ? new Date() : new Date(anotherDate);

    const Difference_In_Time = date2.getTime() - date1.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.round(Difference_In_Days);
  }
  isDateMaxThanToday(date: string, flag: number = 0): boolean {
    // If date is like 12-2022(MM-YYYY)
    const today = new Date();
    if (flag == 0) {
      const dArr = date.split('-');
      if (Number(dArr[1]) > today.getFullYear()) {
        return true;
      } else if (Number(dArr[0]) >= (today.getMonth() + 1) && Number(dArr[1]) === today.getFullYear()) {
        return true;
      }
    }
    return false;
  }

  calculateFinancialYear(date = ''): any {
    // get the current date
    const now = date === '' ? new Date() : new Date(date);

    // determine the current financial year
    let financialYear = "";
    if (now.getMonth() >= 3) {
      // if the current month is April or later, the financial year is the current year to the next year
      financialYear = now.getFullYear() + "-" + (now.getFullYear() + 1).toString().slice(-2);
    } else {
      // if the current month is before April, the financial year is the previous year to the current year
      financialYear = (now.getFullYear() - 1) + "-" + now.getFullYear().toString().slice(-2);
    }
    return financialYear;
  }
}
