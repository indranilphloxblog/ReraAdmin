import {Component, OnInit} from '@angular/core';
import {CommonService} from '../services/common.service'
import {RestApiService} from '../services/rest-api.service'
import {Router} from '@angular/router';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = '';
  userPassword = '';
  userNameErr = '';
  userPasswordErr = '';
  hide = true;
  loginErr = '';

  constructor(private router: Router, private common: CommonService, private rest: RestApiService,
              private notifier: NotifierService) {
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  passfun(): any {
    this.hide = !this.hide
  }

  userNameFun(): any {
    this.userNameErr = ''
  }

  passwordFun(): any {
    this.userPasswordErr = ''
  }

  onSubmit(): any {
    this.userNameErr = '';
    this.userPasswordErr = '';
    let err = 0;
    if (this.userName == '') {
      err++;
      this.userNameErr = 'Enter username'
    }
    if (this.userPassword == '') {
      err++;
      this.userPasswordErr = 'Enter password'
    }
    const data = {
      username: this.userName,
      password: this.userPassword,
      deviceid:this.common.getDeviceId()
    };
    if (err === 0) {
      this.common.loaderStart();
      this.rest.login(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.common.setUserData(res.response);
          this.common.setToken(res.response.token);
          if (res.response.roleid === 1 || res.response.roleid === 11) {
            this.router.navigate(['/mst']);
          } else {
            this.router.navigate(['/user/dashborad']);
          }
        } else {
          this.loginErr = 'Login failed';
          this.common.loaderEnd();
        }
      }, (err: Error) => {
        this.common.loaderEnd();
      });
    }
  }

  changePassword() {
    if (this.userName === '') {
      this.userNameErr = 'Please Enter register email'
    } else {
      const data = {
        reraid: 1,
        panno: this.userName,
        roleid: 0+''
      };
      this.common.loaderStart();
      this.rest.forgetPassword(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.common.forgotPasswordObj = {
            panno: this.userName,
            roleid: 0+'',
            verifyid: res.response.id,
            userid: res.response.userid
          };
          this.router.navigate(['change-password']);
        } else {
          this.notifier.notify('error', res.message);
        }
      });
    }
  }

}
