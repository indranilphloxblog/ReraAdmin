import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {AuthguardGuard} from '../Authorization/authguard.guard'
import {MstEntityComponent} from "../pages/mst-entity/mst-entity.component";
import {ProjectListComponent} from "./project-list/project-list.component";
import {WorkflowChecklistComponent} from "./workflow-checklist/workflow-checklist.component";
import {WorkflowComponent} from "./workflow/workflow.component";
import {ProjectListDashboardComponent} from "./project-list-dashboard/project-list-dashboard.component";
import {RegisterListComponent} from "./register-list/register-list.component";
import {CgmlistComponent} from "./cgmlist/cgmlist.component";
import { SubmittedQprListComponent } from './QPR/submitted-qpr-list/submitted-qpr-list.component';
import { SubmittedQprDtlComponent } from './QPR/submitted-qpr-dtl/submitted-qpr-dtl.component';
import {RegisteredProjectListComponent} from './registered-project-list/registered-project-list.component';
import { RegisteredAgentComponent } from './registered-agent/registered-agent.component';
import { AgentPreviewDetailsComponent } from './agent-preview-details/agent-preview-details.component';
import { ProjectDetailsPreviewComponent } from './project-details-preview/project-details-preview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashborad',
    pathMatch: 'full'
  }, {
    path: '', component: UserComponent, children: [{
      path: 'dashborad',
      component: ProjectListDashboardComponent
    },{
      path: 'projectList',
      component: ProjectListComponent
    },{
      path: 'projectDetails',
      component: WorkflowComponent
    },{
      path:'registerProjectList',
      component:RegisterListComponent
    },{
      path:'cgmlist',
      component:CgmlistComponent
    }, {
      path: 'submitted-qpr-list',
      component: SubmittedQprListComponent
    }, {
      path: 'qpr-details',
      component: SubmittedQprDtlComponent
    }, {
      path: 'registered-project',
      component: RegisteredProjectListComponent
    }, {
      path: 'registered-agent',
      component: RegisteredAgentComponent
    },{
      path: 'agent-preview-details',
      component: AgentPreviewDetailsComponent
    }, {
      path: 'project-preview',
      component: ProjectDetailsPreviewComponent
    } 
    ]
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
