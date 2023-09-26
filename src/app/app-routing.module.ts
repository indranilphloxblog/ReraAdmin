import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
}, {
    path: 'login',
    component: LoginComponent
},   {
  path: 'change-password',
  component: ChangePasswordComponent
}, {
    path: 'mst',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
}, {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
