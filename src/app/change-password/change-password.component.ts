import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../services/common.service";
import {NotifierService} from "angular-notifier";
import {RestApiService} from "../services/rest-api.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  otp = '';
  password = '';
  confPassword = '';
  userId = 0;
  verificationId = 0;
  otpErr = '';
  passwordErr = '';
  confPasswordErr = '';
  hide = true;
  isVerify = false;
  disableResetBtn = false;
  constructor(private router: Router, private common: CommonService, private notifier: NotifierService,
              private rest: RestApiService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if(this.common.forgotPasswordObj.panno === '') {
      this.router.navigate(['/login']);
    }
  }

  passfun() {
    this.hide = !this.hide;
  }

  onSubmit(): any {
    this.passwordErr = '';
    this.confPasswordErr = '';
    if (this.password.trim() === '') {
      this.passwordErr = 'Enter the password';
      return false;
    }
    if (this.confPassword.trim() === '') {
      this.confPasswordErr = 'Enter the confirm password';
      return false;
    }
    if (this.password !== this.confPassword) {
      this.confPasswordErr = 'Password and confirm password does not match';
      return false;
    }
    const data = {
      password: this.password,
      userid: this.common.forgotPasswordObj.userid
    };
    this.common.loaderStart();
    this.disableResetBtn = true;
    this.rest.resetPassword(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.notifier.notify('success', res.message);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      } else {
        this.notifier.notify('error', res.message);
      }
    })
  }

  verifyOTP(): any {
    this.otpErr = '';
    if (this.otp.trim() === '') {
      this.otpErr = 'Enter the OTP';
      return false;
    }
    const data = {
      id: this.common.forgotPasswordObj.verifyid,
      panno: this.common.forgotPasswordObj.panno,
      roleid: this.common.forgotPasswordObj.roleid,
      otp: this.otp
    };
    this.common.loaderStart();
    this.rest.otpVerification(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.isVerify = true;
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }

}
