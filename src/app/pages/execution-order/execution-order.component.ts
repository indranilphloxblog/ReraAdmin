import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MstProfileFieldsService} from "../../services/mst-profile-fields.service";
import {CommonService} from "../../services/common.service";
import {NotifierService} from "angular-notifier";
import {RestApiService} from "../../services/rest-api.service";

@Component({
  selector: 'app-execution-order',
  templateUrl: './execution-order.component.html',
  styleUrls: ['./execution-order.component.css']
})
export class ExecutionOrderComponent implements OnInit {
  isLoading = true;
  @ViewChild('modal') modal: any;
  ComplaintID = '';
  ComplaintTO: string = '';
  Project_Name: string = '';
  Promoter_Name: string = '';
  Name_Complainant: string = '';
  Subject_Complaint: string = '';
  Name_Respondent: string = '';
  Name_of_Document: string = '';
  Document_Path: string = '';
  Status_Type: string = '';
  Doc_Path: string = '';
  Case_No: string = '';
  NHDate: string = '';
  Date_Proceeding: string = '';
  errorMessage = '';
  offset = 0;
  limit = 20;
  searchText = '';
  searchComplaintTo = '';
  searchStatusType = '';
  listData: any = [];
  complaintIds: any = [];
  complaintDetails: any;
  isNextStep = true;
  isPrevStep = false;
  modalHeader = '';
  id = 0;
  statusId = 0;
  selectedPosition = 0;
  In_Court_Of = '';
  inCourtArr = ['Single Bench Honourable Member Mrs. Nupur Banerjee',
    'Single Bench Honourable Chairman Shri Naveen Verma',
    'Adjudicating Officer Shri Ambrish Kr. Tiwari',
    'Single Bench Honourable Member Mr. R. B. Sinha',
    'Double Bench Honourable Chairman Shri Naveen Verma and Honourable Member Mrs. Nupur Banerjee',
    'Execution case Shri Ved Prakash',
    'Adjudicating Officer Shri Ved Prakash',
    'Execution case Shri Ved Prakash and Shri Anil Kumar',
    'Full Bench Honourable Chairman and Member',
    'Double Bench Honourable Member Mrs. Nupur Banerjee and Honourable Member Mr. S. D. Jha',
    'Single Bench Honourable Member Mr. S. D. Jha',
    'Double Bench Honourable Chairman Shri Naveen Verma and Honourable Member Mr. S. D. Jha',
    'Double Bench Honourable Chairman Shri Afzal Amanullah   and Honourable Member Mr. R. B. Sinha',
    'Double Bench Honourable Chairman Shri Naveen Verma and Honourable Member Mr. S. K. Sinha',
    'Double Bench Honourable Chairman Shri Afzal Amanullah   and Honourable Member Mr. S. K. Sinha',
    'Conciliation cases',
    'Single Bench Honourable Chairman Shri Afzal Amanullah'];
  isButtonDisabled = false;

  constructor(private modalService: NgbModal, private apiService: MstProfileFieldsService, private common: CommonService,
    private notifier: NotifierService, private rest: RestApiService) { }

  ngOnInit(): void {
    this.getData(1);
  }

  openModal(flag = 0): void {
    if (flag === 0) {
      this.reset();
    }
    this.errorMessage = '';
    this.isButtonDisabled = false;
    this.modalHeader = flag === 0 ? 'Add' : 'Update';
    this.modalService.open(this.modal, {centered: true, size: 'xl', backdrop: false});
  }

  reset(): any {
    this.ComplaintID = '';
    this.ComplaintTO = '';
    this.Project_Name = '';
    this.Promoter_Name = '';
    this.Name_Complainant = '';
    this.Name_Respondent = '';
    this.Subject_Complaint = '';
    this.Name_of_Document = '';
    this.Document_Path = '';
    this.Status_Type = '';
    this.Doc_Path = '';
    this.Case_No = '';
    this.NHDate = '';
    this.Date_Proceeding = '';
    this.In_Court_Of = '';
    this.id = 0;
    this.statusId = 0;
  }

  closeModal(): void {
    this.modalService.dismissAll();
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
            this.Doc_Path = res.response.fileName;
          } else if (fileType === 'document') {
            this.Document_Path = res.response.fileName;
          }
        }
      }, (err: any) => {
        this.common.loaderEnd();
      })
    }
  }

  edit(obj: any, pos: number): void {
    this.ComplaintID = obj.ComplaintID;
    this.ComplaintTO = obj.ComplaintTO;
    this.Project_Name = obj.Project_Name;
    this.Promoter_Name = obj.Promoter_Name;
    this.Name_Complainant = obj.Name_Complainant;
    this.Name_Respondent = obj.Name_Respondent;
    this.Subject_Complaint = obj.Subject_Complaint;
    this.Name_of_Document = obj.Name_of_Document;
    this.Document_Path = obj.Document_Path;
    this.Status_Type = obj.Status_Type;
    this.Doc_Path = obj.Doc_Path;
    this.Case_No = obj.Case_No;
    this.NHDate = this.common.formatDate(obj.NHDate);
    this.Date_Proceeding = this.common.formatDate(obj.Date_Proceeding);
    this.In_Court_Of = obj.In_Court_Of;
    this.id = obj.ID;
    this.statusId = obj.complaintStatus_primaryId;
    this.openModal(1);
  }

  openTab(data: any) {
    window.open(this.rest.FILE_ROOT + data)
  }

  getData(flag = 0): any {
    if (flag === 1) {
      this.offset = 0;
    }
    const data = {
      limit: this.limit + '',
      offset: this.offset + '',
      searchText: this.searchText,
      ComplaintTO: this.searchComplaintTo,
      statusType: this.searchStatusType
    };
    this.common.loaderStart();
    this.rest.getExecutionOrderData(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        for(const obj of res.response.ComplaintData) {
          obj.NHDate = obj.NHDate && obj.NHDate !== ''? this.common.formatDate(obj.NHDate) : '';
          obj.Date_Proceeding = obj.Date_Proceeding ? this.common.formatDate(obj.Date_Proceeding) : '';
        }
        this.listData = res.response.ComplaintData;        ;
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.listData);
        this.isNextStep = this.listData.length >= this.limit;
      }
    }, (err: any) => {
      this.common.loaderEnd();
    })

  }

  getDataComplaintID(): any{
    if(this.ComplaintID.length > 5) {
      const data = {
        ComplaintID: this.ComplaintID
      };
      this.isLoading = true;
      this.rest.getSearchableComplaintData(data).subscribe((res: any) => {
        this.isLoading = false;
        if (res.success) {
          this.complaintIds = res.response;
        }
      }, (err: any) => {
        this.common.loaderEnd();
      })
    }
  }

  getComplaintDetailsByIdData(): any{
    const data = {
      ComplaintID: this.ComplaintID
    };
    this.common.loaderStart();
    this.rest.getComplaintDetailsByIdData(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        this.complaintDetails = res.response;
        this.ComplaintTO = this.complaintDetails[0].ComplaintTO;
        this.Project_Name = this.complaintDetails[0].Project_Name;
        this.Promoter_Name = this.complaintDetails[0].Promoter_Name;
        this.Name_Complainant = this.complaintDetails[0].Name_Complainant;
        this.Name_Respondent = this.complaintDetails[0].Name_Respondent;
        this.Subject_Complaint = this.complaintDetails[0].Subject_Complaint;
        // console.log(this.complaintDetails);
      }
    }, (err: any) => {
      this.common.loaderEnd();
    })
  }

  next(): void {
    if (this.isNextStep) {
      this.isPrevStep = true;
      this.offset += this.limit;
      this.getData();
    }
  }

  previous(): void {
    if (this.offset > 0) {
      this.offset = this.offset - this.limit;
      if (this.offset === 0) {
        this.isPrevStep = false;
      }
      this.getData();
    }
  }

  submitData(type = 'Add'): any {
    if(this.ComplaintID === '') {
      this.errorMessage='ComplaintID is required';
      return false;
    }
    if(this.ComplaintTO === '') {
      this.errorMessage='ComplaintTO is required';
      return false;
    }
    // if(this.ComplaintTO !== 'Conciliation Forum') {
    //   if(this.In_Court_Of === '') {
    //     this.errorMessage='In Court Of is required';
    //     return false;
    //   }
    // }
    if(this.Project_Name === '') {
      this.errorMessage='Project Name is required';
      return false;
    }
    if(this.Promoter_Name === '') {
      this.errorMessage='Promoter Name is required';
      return false;
    }
    if(this.Name_Complainant === '') {
      this.errorMessage='Complainant Name is required';
      return false;
    }
    if(this.Name_Respondent === '') {
      this.errorMessage='Respondent Name is required';
      return false;
    }
    if(this.Subject_Complaint === '') {
      this.errorMessage='Subject of Complaint is required';
      return false;
    }
    if(this.Case_No === '') {
      this.errorMessage='Case No is required';
      return false;
    }
    if(this.NHDate === '') {
        this.errorMessage='Next Hearing Date is required';
        return false;
    }
    if(this.Doc_Path === '') {
      this.errorMessage='Hearing/order is required';
      return false;
    }
    if(this.Date_Proceeding === '') {
      this.errorMessage='Date of Proceeding is required';
      return false;
    }
    if(this.Status_Type === '') {
      this.errorMessage='Status Type is required';
      return false;
    }
    const data: any = {
      "ComplaintID" : this.ComplaintID,
      "Project_Name" : this.Project_Name,
      "Status_Type" : this.Status_Type,
      "Case_No" : this.Case_No,
      "Doc_Path" : this.Doc_Path,
      "NHDate" : this.NHDate,
      "Date_Proceeding" : this.Date_Proceeding,
      "User_Name" : "admin",
      "In_Court_Of" : this.In_Court_Of
  };
    this.common.loaderStart();
    this.isButtonDisabled = true;
    if(type === 'Add') {
      this.rest.addExecutionOrder(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.isButtonDisabled = false;
          this.closeModal();
          this.notifier.notify('success', res.message);
          this.getData(1);
        } else {
          this.errorMessage = res.message;
          this.notifier.notify('error', res.message);
        }
      }, (error: any) => {
        this.common.loaderEnd();
      });
    }
    else {
      data.complaintStatusID = this.statusId;
      // data.id = this.id;
      this.rest.editExecutionOrder(data).subscribe((res: any) => {
        this.common.loaderEnd();
        if (res.success) {
          this.isButtonDisabled = false;
          this.closeModal();
          this.notifier.notify('success', res.message);
          this.getData(1);
        } else {

          this.notifier.notify('error', res.message);
        }
      }, (error: any) => {
        this.common.loaderEnd();
      });
    }
  }

  openDeleteModal(deleteModal: any, id: number, statusId: number, pos: number): void {
    this.selectedPosition = pos;
    this.id = id;
    this.statusId = statusId;
    this.modalService.open(deleteModal, {centered: true});
  }

  deleteData(): void {
    const data = {
      complaintStatusID: this.statusId
    };
    this.rest.deleteExecutionOrder(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.closeModal();
        this.listData.splice(this.selectedPosition, 1);
      } else {
        this.notifier.notify('error', res.message);
        this.closeModal();
      }
    })
  }

}
