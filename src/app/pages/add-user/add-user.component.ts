import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../../services/common.service';
import {NotifierService} from 'angular-notifier';
import {MstProfileFieldsService} from '../../services/mst-profile-fields.service';
import {RestApiService} from '../../services/rest-api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild('modal') modal: any;
  modalHeader = '';
  
  username = "";
  father_name = "";
  useremail = "";
  usermobile = "";
  department = 0;
  designation = "";
  date_of_join = "";
  address = "";
  selectedUserId = "";
  supporting_doc = "";
  description = "";
  isactive = "";
  dsc_authorised = '0';
  
  isLoading = false;

  err = 0;
  errMsg = '';
  listData: any = [];
  deptList: any = [];
  selectedPosition = 0;

  constructor(private modalService: NgbModal, private apiService: MstProfileFieldsService, private common: CommonService,
              private notifier: NotifierService, private rest: RestApiService) {
  }


  ngOnInit(): void {
    this.getData()
    this.fetchDepartment()
  }

  selectdscauth(flag: string) {
    this.dsc_authorised = flag;
  }

  openModal(flag: any, user: any): void {
    this.modalHeader = flag === 0 ? 'Add' : 'Update';
    if (flag === 1) {
      this.selectedUserId = user.userid;
      this.username = user.username;
      this.father_name = user.father_name;
      this.useremail = user.useremail;
      this.usermobile = user.usermobile;
      this.department = user.roleid;
      this.designation = user.designation;
      this.date_of_join = user.date_of_join;
      this.address = user.address;
      this.description = user.description;
      this.dsc_authorised = user.dsc_authorised;
      }
    this.modalService.open(this.modal, {size: 'lg'})
    if (flag === 0) {
      this.reset();
    }
  }

  reset(): void {
    this.selectedUserId = "";
    this.username = "";
    this.father_name = "";
    this.useremail = "";
    this.usermobile = "";
    this.department = 0;
    this.designation = "";
    this.date_of_join = "";
    this.address = "";
    this.supporting_doc = "";
    this.description = "";
    this.dsc_authorised = '0';
  }

  getData(): any {
    let data = {
      userid: this.common.getUserId()
    }
    this.common.loaderStart();
    this.rest.fetchuserbyadmin(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.listData = res.response;
        // console.log(this.listData)
      }
    }, (err: any) => {
      console.log(err)
      this.common.loaderEnd();
    })

  }

  fetchDepartment(): any {
    let data = {
      userid: this.common.getUserId()
    }
    this.common.loaderStart();
    this.rest.fetchDepartment(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.deptList = res.response;
      }
    }, (err: any) => {
      console.log(err)
      this.common.loaderEnd();
    })

  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  saveData(): any {
    this.err = 0;
    this.errMsg = '';
    if (this.username === '') {
      this.errMsg = 'Please Enter Name';
      this.err++
    } else if (this.father_name === '') {
      this.errMsg = 'Please Enter Father Name';
      this.err++
    } else if (this.useremail === '') {
      this.errMsg = 'Please Enter Email';
      this.err++
    } else if (this.usermobile === '') {
      this.errMsg = 'Please Enter Phone no';
      this.err++
    } else if (this.department == 0) {
      this.errMsg = 'Please Choose Department';
      this.err++
    } else if (this.designation === '') {
      this.errMsg = 'Please Enter Designation';
      this.err++
    } else if (this.date_of_join === '') {
      this.errMsg = 'Please Enter Date of Join';
      this.err++
    } else if (this.address === '') {
      this.errMsg = 'Please Enter Address';
      this.err++
    }

    function generatePass() {
      let pass = '';
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
          'abcdefghijklmnopqrstuvwxyz0123456789@#$';
   
      for (let i = 1; i <= 8; i++) {
          let char = Math.floor(Math.random()
              * str.length + 1);
   
          pass += str.charAt(char)
      }
   
      return pass;
    }

    const data = {
      userid: this.common.getUserId(),
      reraid: this.common.getReraId(),
      username : this.username,
      father_name : this.father_name,
      useremail : this.useremail,
      usermobile : this.usermobile,
      department : this.department,
      designation : this.designation,
      date_of_join : this.date_of_join,
      address : this.address,
      supporting_doc : this.supporting_doc,
      description: this.description,
      dsc_authorised: this.dsc_authorised,
      userpassword: generatePass()
      
    };
    this.common.loaderStart();

    if (this.err === 0) {
      this.rest.adduserbyadmin(data).subscribe((res: any) => {
        if (res.success) {
          this.common.loaderEnd();
          this.closeModal();
          this.notifier.notify('success', res.message);
          this.reset();
          this.getData();
        } else {
          this.notifier.notify('error', res.message);
          this.common.loaderEnd();
        }
      });
    }
  }

  updateData() {
    this.err = 0;
    this.errMsg = '';
    if (this.username === '') {
      this.errMsg = 'Please Enter Name';
      this.err++
    } else if (this.father_name === '') {
      this.errMsg = 'Please Enter Father Name';
      this.err++
    } else if (this.useremail === '') {
      this.errMsg = 'Please Enter Email';
      this.err++
    } else if (this.usermobile === '') {
      this.errMsg = 'Please Enter Phone no';
      this.err++
    } else if (this.department == 0) {
      this.errMsg = 'Please Choose Department';
      this.err++
    } else if (this.designation === '') {
      this.errMsg = 'Please Enter Designation';
      this.err++
    } else if (this.date_of_join === '') {
      this.errMsg = 'Please Enter Date of Join';
      this.err++
    } else if (this.address === '') {
      this.errMsg = 'Please Enter Address';
      this.err++
    }

    const data = {
      userid: this.common.getUserId(),
      reraid: this.common.getReraId(),
      selectedUserId: this.selectedUserId,
      username : this.username,
      father_name : this.father_name,
      useremail : this.useremail,
      usermobile : this.usermobile,
      department : this.department,
      designation : this.designation,
      date_of_join : this.date_of_join,
      address : this.address,
      supporting_doc : this.supporting_doc,
      description: this.description,
      dsc_authorised: this.dsc_authorised,
    };

    this.common.loaderStart();

    if (this.err === 0) {
      this.rest.updatebyadmin(data).subscribe((res: any) => {
        if (res.success) {
          this.common.loaderEnd();
          this.closeModal();
          this.notifier.notify('success', res.message);
          this.reset();
          this.getData();
        } else {
          this.common.loaderEnd();
          this.notifier.notify('error', res.message);
        }
      });
    }

  }

  openTab(data: any) {
    window.open(this.rest.NEWS_ROOT + data)
  }

  openDeleteModal(deleteModal: any, item: any, status: string): void {
    this.username = item.username;
    this.selectedUserId = item.userid;
    this.isactive = status;
    this.modalService.open(deleteModal, {centered: true});
  }
  
  deleteData(): void {
    const data = {
      userid: this.common.getUserId(),
      reraid: this.common.getReraId(),
      selectedUserId: this.selectedUserId,
      status:this.isactive
    };
    this.rest.updateuserstatusbyadmin(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.closeModal();
        this.reset()
        this.getData();
        this.listData.splice(this.selectedPosition, 1);
      } else {
        this.notifier.notify('error', res.message);
        this.reset()
        this.closeModal();
      }
    })
  }

  uploadFile(event: any, fileType: any = '') {
    if (event.target.files.length > 0) {
      const fd = new FormData();
      fd.append('file', event.target.files[0]);
      this.common.loaderStart();
      this.rest.uploadOrderFile(fd).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          if(fileType === 'docpath') {
            this.supporting_doc = res.response.fileName;
          } else if (fileType === 'document') {
            this.supporting_doc = res.response.fileName;
          }
        }
      }, (err: any) => {
        this.common.loaderEnd();
      })
    }
  }


}
