import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  API_ROOT = this.config.API_ROOT;
  IFIX_URL = this.config.IFIX_URL;
  FILE_ROOT = this.config.FILE_ROOT;
  NEWS_ROOT = this.config.NEWS_ROOT;
  FILE_URL = this.config.FILE_URL;
  constructor(private config: ConfigService, private http: HttpClient) { }
  login(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_user/login', data);
  }

  rolelist(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_user/rolelist', data);
  }

  list(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_user/list', data);
  }

  add(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_user/add', data);
  }

  update(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_user/update', data);
  }

  delete(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_user/delete', data);
  }

  changeRoleName(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_user/changeRoleName', data);
  }

  getFormInfo(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/project/form-info', JSON.stringify(data), httpOptions);
  }
  addAllFieldDetails(data: any){
    return this.http.post(this.API_ROOT + 'v1/project/addallfielddetails', JSON.stringify(data), httpOptions);
  }
  deleteProfileTemp(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/render-profile/delete-temp', JSON.stringify(data), httpOptions);
  }
  getLatLong(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/location/getlatlong', JSON.stringify(data), httpOptions);
  }
  getProfileFormInfo(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/render-profile/form-info', JSON.stringify(data), httpOptions);
  }

  getFormSubmitInfo(data: any){
    return this.http.post(this.API_ROOT + 'v1/render-profile/getFormSubmitInfo', JSON.stringify(data), httpOptions);
  }

  /*getCaseByProject(data: any) {
    return this.http.get(this.IFIX_URL + 'getcasedetails?Project_registration_no=' + data.projectRegNo + '&nextOffset=0&paginationType=next&page_size=10')
  }*/
  getCaseByProject(data: any) {
    return this.http.get(this.IFIX_URL + 'getCaseCountBasedProjectId?Project_registration_no='+ data.projectRegNo); // data.projectRegNo
  }

  getPastProjectOutsideCaseDtl(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project/getPastProjectOutsideCaseDtl', JSON.stringify(data), httpOptions);
  }
  getPastProjects(data: any){
    return this.http.post(this.API_ROOT + 'v1/project/past-projects', JSON.stringify(data), httpOptions);
  }
  getState(data:any){
    return this.http.post(this.API_ROOT + 'v1/project/getState', JSON.stringify(data), httpOptions);
  }
  getDistricts(data:any){
    return this.http.post(this.API_ROOT + 'v1/project/getDistricts', JSON.stringify(data), httpOptions);
  }

  uploadFile(data:any){
    return this.http.post(this.API_ROOT + 'v1/mst_notice/fileupload',data);
  }

  uploadOrderFile(data:any){
    return this.http.post(this.API_ROOT + 'v1/mst_annual_report/fileupload',data);
  }

  noticelist(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_notice/list', data);
  }

  noticeadd(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_notice/add', data);
  }

  noticeupdate(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_notice/update', data);
  }

  noticedelete(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_notice/delete', data);
  }
  generateProjectExtensionId(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project-extension/generateProjectExtensionId', JSON.stringify(data), httpOptions);
  }
  getDevelopmentPlan(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project-extension/getDevelopmentPlan', JSON.stringify(data), httpOptions);
  }
  getDocuments(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project-extension/getDocuments', JSON.stringify(data), httpOptions);
  }
  getBuildingListOfProject(data: any){
    return this.http.post(this.API_ROOT + 'v1/project-stage-two/getBuildingListOfProject', JSON.stringify(data), httpOptions);
  }
  getAllSubmittedQuarterList(data: any){
    return this.http.post(this.API_ROOT + 'v1/project-execution/getAllSubmittedQuarterList', JSON.stringify(data), httpOptions);
  }

  getProjectDetail(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project-execution/getProjectDetail', JSON.stringify(data), httpOptions);
  }

  getOldQPRDetails(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project-execution/getOldQPRDetails', JSON.stringify(data), httpOptions);
  }
  getPendingQuoterList(data:any){
    return this.http.post(this.API_ROOT + 'v1/project-execution/getPendingQuoterList', JSON.stringify(data), httpOptions);
  }
  getSubmittedQuoterList(data:any){
    return this.http.post(this.API_ROOT + 'v1/project-execution/getSubmittedQuoterList', JSON.stringify(data), httpOptions);
  }
  getInventoryData(data:any){
    return this.http.post(this.API_ROOT + 'v1/project-execution/getInventoryData', JSON.stringify(data), httpOptions);
  }
  getConstructionProgress(data:any){
    return this.http.post(this.API_ROOT + 'v1/project-execution/getConstructionProgress', JSON.stringify(data), httpOptions);
  }
  getFinancial_details(data:any){
    return this.http.post(this.API_ROOT + 'v1/project-execution/getFinancial_details', JSON.stringify(data), httpOptions);
  }
  getLegalCase(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project-execution/getLegalCase', JSON.stringify(data), httpOptions);
  }
  getBuildingPhotograph(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project-execution/getBuildingPhotograph', JSON.stringify(data), httpOptions);
  }
  getPhotoParticulars() {
    return this.http.get(this.API_ROOT + 'v1/project-execution/getPhotoParticulars', httpOptions);
  }

  forgetPassword(data:any) {
    return this.http.post(this.API_ROOT + 'v1/mst_user/forgetPassword', JSON.stringify(data), httpOptions);
  }

  otpVerification(data:any) {
    return this.http.post(this.API_ROOT + 'v1/mst_user/otpVerification', JSON.stringify(data), httpOptions);
  }

  resetPassword(data:any) {
    return this.http.post(this.API_ROOT + 'v1/mst_user/resetPassword', JSON.stringify(data), httpOptions);
  }

  causelist(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/public-cause-list/list', data);
  }

  causeadd(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/public-cause-list/add', data);
  }

  causeupdate(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/public-cause-list/update', data);
  }

  causedelete(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/public-cause-list/delete', data);
  }

  causeListUploadFile(data:any){
    return this.http.post(this.API_ROOT + 'v1/public-cause-list/fileupload',data);
  }

  orderJudgementlist(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/order-judgement/list', data);
  }

  orderJudgementadd(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/order-judgement/add', data);
  }

  orderJudgementupdate(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/order-judgement/update', data);
  }

  orderJudgementdelete(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/order-judgement/delete', data);
  }

  getFeedback(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/onboarding/getFeedback', data);
  }

  updateInterimData(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/cgm/updateInterimData', data);
  }

  insertInterimData(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/cgm/insertInterimData', data);
  }

  deleteInterimData(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/cgm/deleteInterimData', data);
  }

  getInternListData(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/cgm/getInternListData', data);
  }

  getExecutionOrderData(data:any) {
    return this.http.post(this.API_ROOT + 'v1/order-judgement/executionOrderList', JSON.stringify(data), httpOptions);
  }

  getSearchableComplaintData(data:any) {
    return this.http.post(this.API_ROOT + 'v1/order-judgement/searchComplaintById', JSON.stringify(data), httpOptions);
  }

  getComplaintDetailsByIdData(data:any) {
    return this.http.post(this.API_ROOT + 'v1/order-judgement/getComplaintDetailsById', JSON.stringify(data), httpOptions);
  }

  addExecutionOrder(data:any) {
    return this.http.post(this.API_ROOT + 'v1/order-judgement/saveExecutionOrder', JSON.stringify(data), httpOptions);
  }

  editExecutionOrder(data:any) {
    return this.http.post(this.API_ROOT + 'v1/order-judgement/updateExecutionOrder', JSON.stringify(data), httpOptions);
  }

  deleteExecutionOrder(data:any) {
    return this.http.post(this.API_ROOT + 'v1/order-judgement/deleteExecutionOrder', JSON.stringify(data), httpOptions);
  }

  searchByProjectName(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project/searchByProjectName', JSON.stringify(data), httpOptions);
  }

  searchByAgentName(data:any) {
    return this.http.post(this.API_ROOT + 'v1/agent/searchByAgentName', JSON.stringify(data), httpOptions);
  }

  updateEApprovalDetails(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project/updateEApprovalDetails', JSON.stringify(data), httpOptions);
  }

  updateAgentStatus(data:any) {
    return this.http.post(this.API_ROOT + 'v1/agent/updateAgentStatus', JSON.stringify(data), httpOptions);
  }

  fetchProjectsList(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project/fetchProjectsList', JSON.stringify(data), httpOptions);
  }

  fetchAgentList(data:any) {
    return this.http.post(this.API_ROOT + 'v1/agent/fetchAgentList', JSON.stringify(data), httpOptions);
  }

  getPaymentDetails(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project/getPaymentDetails', JSON.stringify(data), httpOptions);
  }

  certificateUpload(data:any) {
    return this.http.post(this.API_ROOT + 'v1/project/certificateUpload', data);
  } 

  holidayslist(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_holidays/list', data);
  }

  holidaysadd(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_holidays/add', data);
  }

  holidaysdelete(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_holidays/delete', data);
  }

  holidaysupdate(data: any) {
    return this.http.post(this.API_ROOT + 'v1/mst_holidays/update', data);
  }

  leaveslist(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_leave/list', data);
  }

  leavesadd(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_leave/add', data);
  }

  leavesdelete(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mst_leave/delete', data);
  }

  leavesupdate(data: any) {
    return this.http.post(this.API_ROOT + 'v1/mst_leave/update', data);
  }

  fetchusers(data: any) {
    return this.http.post(this.API_ROOT + 'v1/mst_leave/fetchlist', data);
  }

  marqueelist(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/marquee/list', data);
  }
  marqueeadd(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/marquee/add', data);
  }

  marqueedelete(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/marquee/delete', data);
  }

  marqueeupdate(data: any) {
    return this.http.post(this.API_ROOT + 'v1/marquee/update', data);
  }

  fetchuserbyadmin(data: any) {
    return this.http.post(this.API_ROOT + 'v1/user/fetchbyadmin', data);
  }

  fetchDepartment(data: any) {
    return this.http.post(this.API_ROOT + 'v1/user/fetchdept', data);
  }

  adduserbyadmin(data: any) {
    return this.http.post(this.API_ROOT + 'v1/user/addbyadmin', data);
  }

  updatebyadmin(data: any) {
    return this.http.post(this.API_ROOT + 'v1/user/updatebyadmin', data);
  }

  updateuserstatusbyadmin(data: any) {
    return this.http.post(this.API_ROOT + 'v1/user/active-inactive', data);
  }
}
