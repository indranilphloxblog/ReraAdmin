import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/services/common.service';
import { ProjectListService } from 'src/app/services/project-list.service';
import { RegisterListService } from 'src/app/services/register-list.service';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})
export class RegisterListComponent implements OnInit {

  listData: any = []
  rolename: any = ''
  roletype: any = ''
  tiletype: number = 0
  limit = 10;
  offset = 0;
  pages : any = [];
  isNextStep = true;
  isPrevStep = false;
  isPageFont:any ='#007bff';
  isCurrentPageFont:any = ''
  isPageBackground:any ='#fff';
  isCurrentPageBackground:any = ''
  selectedPage:any = 0
  pageLimit = 10;
  totalCount = 0;
  p: number = 1;
  searchText = '';
  regNo = '';
  constructor(private common: CommonService,private notifier: NotifierService,private apiService: RegisterListService,private projectlistService: ProjectListService) { }

  ngOnInit(): void {

    sessionStorage.removeItem('pid');
    sessionStorage.removeItem('eid');
    sessionStorage.removeItem('aid');
    this.rolename = this.common.getRolename();
    this.roletype = this.common.getRoletype();
    this.tiletype = this.common.getTileType()
    this.common.setTileType(this.tiletype);

  }

  pageChange(event: any) {
    this.p = event;
    this.offset = (this.p-1) * this.limit;
  }

  viewCertificate(fileName:any){
    window.open(this.projectlistService.BASE_ROOT + 'certificate/' + fileName, '_blank');
  }
}
