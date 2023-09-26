import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MstProfileFieldsService} from "../../services/mst-profile-fields.service";
import {CommonService} from "../../services/common.service";
import {NotifierService} from "angular-notifier";
import {RestApiService} from "../../services/rest-api.service";

@Component({
  selector: 'app-mst-order-judgement',
  templateUrl: './mst-order-judgement.component.html',
  styleUrls: ['./mst-order-judgement.component.css']
})
export class MstOrderJudgementComponent implements OnInit {

  @ViewChild('modal') modal: any;
  ComplaintID: string = '';
  ComplaintTO: string = '';
  IsRegisteredRERA: string = '';
  Project_Name: string = '';
  Promoter_Name: string = '';
  Name_Complainant: string = '';
  Mobile_Number: string = '';
  Email_Id: string = '';
  Official_Address: string = '';
  Name_Respondent: string = '';
  Respondent_Mobile_Number: string = '';
  Respondent_EmailID: string = '';
  Respondent_Official_Address: string = '';
  Subject_Complaint: string = '';
  Facts_Complaint: string = '';
  Relief_Sought_RERA: string = '';
  Name_of_Document: string = '';
  Document_Path: string = '';
  Payment_Mode: string = '';
  Bank_Name: string = '';
  Amount: string = '';
  Branch: string = '';
  DD_Cheque_No: string = '';
  DD_Cheque_Path: string = '';
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
              private notifier: NotifierService, private rest: RestApiService) {
  }

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
    this.IsRegisteredRERA = '';
    this.Project_Name = '';
    this.Promoter_Name = '';
    this.Name_Complainant = '';
    this.Mobile_Number = '';
    this.Email_Id = '';
    this.Official_Address = '';
    this.Name_Respondent = '';
    this.Respondent_Mobile_Number = '';
    this.Respondent_EmailID = '';
    this.Respondent_Official_Address = '';
    this.Subject_Complaint = '';
    this.Facts_Complaint = '';
    this.Relief_Sought_RERA = '';
    this.Name_of_Document = '';
    this.Document_Path = '';
    this.Payment_Mode = '';
    this.Bank_Name = '';
    this.Amount = '';
    this.Branch = '';
    this.DD_Cheque_No = '';
    this.DD_Cheque_Path = '';
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
          } else if (fileType === 'check') {
            this.DD_Cheque_Path = res.response.fileName;
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
    this.IsRegisteredRERA = obj.IsRegisteredRERA;
    this.Project_Name = obj.Project_Name;
    this.Promoter_Name = obj.Promoter_Name;
    this.Name_Complainant = obj.Name_Complainant;
    this.Mobile_Number = obj.Mobile_Number;
    this.Email_Id = obj.Email_Id;
    this.Official_Address = obj.Official_Address;
    this.Name_Respondent = obj.Name_Respondent;
    this.Respondent_Mobile_Number = obj.Respondent_Mobile_Number;
    this.Respondent_EmailID = obj.Respondent_EmailID;
    this.Respondent_Official_Address = obj.Respondent_Official_Address;
    this.Subject_Complaint = obj.Subject_Complaint;
    this.Facts_Complaint = obj.Facts_Complaint;
    this.Relief_Sought_RERA = obj.Relief_Sought_RERA;
    this.Name_of_Document = obj.Name_of_Document;
    this.Document_Path = obj.Document_Path;
    this.Payment_Mode = obj.Payment_Mode;
    this.Bank_Name = obj.Bank_Name;
    this.Amount = obj.Amount;
    this.Branch = obj.Branch;
    this.DD_Cheque_No = obj.DD_Cheque_No;
    this.DD_Cheque_Path = obj.DD_Cheque_Path;
    this.Status_Type = obj.Status_Type;
    this.Doc_Path = obj.Doc_Path;
    this.Case_No = obj.Case_No;
    this.NHDate = obj.NHDate;
    this.Date_Proceeding = obj.Date_Proceeding;
    this.In_Court_Of = obj.In_Court_Of;
    this.id = obj.ID;
    this.statusId = obj.statusId;
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
      userid: this.common.getUserId(),
      limit: this.limit + '',
      offset: this.offset + '',
      searchText: this.searchText,
      ComplaintTO: this.searchComplaintTo,
      Status_Type: this.searchStatusType
    };
    this.common.loaderStart();
    this.rest.orderJudgementlist(data).subscribe((res: any) => {
      this.common.loaderEnd();
      if (res.success) {
        for(const obj of res.response) {
          obj.NHDate = obj.NHDate && obj.NHDate !== ''? this.common.formatDate(obj.NHDate) : '';
          obj.Date_Proceeding = obj.Date_Proceeding ? this.common.formatDate(obj.Date_Proceeding) : '';
        }
        this.listData = res.response;
        this.isNextStep = this.listData.length >= this.limit;
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
    if(this.ComplaintTO !== 'Conciliation Forum') {
      if(this.In_Court_Of === '') {
        this.errorMessage='In Court Of is required';
        return false;
      }
    }
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
    if (this.Status_Type !== 'Order/judgment') {
      if(this.NHDate === '') {
        this.errorMessage='Next Hearing Date is required';
        return false;
      }
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
      ComplaintID: this.ComplaintID,
      ComplaintTO: this.ComplaintTO,
      IsRegisteredRERA: this.IsRegisteredRERA,
      Project_Name: this.Project_Name,
      Promoter_Name: this.Promoter_Name,
      Name_Complainant: this.Name_Complainant,
      Mobile_Number: this.Mobile_Number,
      Email_Id: this.Email_Id,
      Official_Address: this.Official_Address,
      Name_Respondent: this.Name_Respondent,
      Respondent_Mobile_Number: this.Respondent_Mobile_Number,
      Respondent_EmailID: this.Respondent_EmailID,
      Respondent_Official_Address: this.Respondent_Official_Address,
      Subject_Complaint: this.Subject_Complaint,
      Facts_Complaint: this.Facts_Complaint,
      Relief_Sought_RERA: this.Relief_Sought_RERA,
      Name_of_Document: this.Name_of_Document,
      Document_Path: this.Document_Path,
      Payment_Mode: this.Payment_Mode,
      Bank_Name: this.Bank_Name,
      Amount: this.Amount,
      Branch: this.Branch,
      DD_Cheque_No: this.DD_Cheque_No,
      DD_Cheque_Path: this.DD_Cheque_Path,
      Status_Type: this.Status_Type,
      Doc_Path: this.Doc_Path,
      Case_No: this.Case_No,
      NHDate: this.NHDate,
      Date_Proceeding: this.Date_Proceeding,
      In_Court_Of: this.In_Court_Of,
    };
    this.common.loaderStart();
    this.isButtonDisabled = true;
    if(type === 'Add') {
      this.rest.orderJudgementadd(data).subscribe((res: any) => {
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
    } else {
      data.statusId = this.statusId;
      data.id = this.id;
      this.rest.orderJudgementupdate(data).subscribe((res: any) => {
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
      id: this.id,
      statusId: this.statusId
    };
    this.rest.orderJudgementdelete(data).subscribe((res: any) => {
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
