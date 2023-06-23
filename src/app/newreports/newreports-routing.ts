import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewreportsComponent } from './newreports.component';
// import { LoginGuard } from '../user-module/gards/login.guard';


const routes: Routes = [  
  {path:'',redirectTo:'newreports',pathMatch:'full'},
  { path: 'newreports', component: NewreportsComponent,data: { breadcrumb: 'newreports' },canActivate:  []},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]

})
export class newreportsRoutingModule { }
