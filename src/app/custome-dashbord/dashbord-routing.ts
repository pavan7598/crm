import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginGuard } from '../user-module/gards/login.guard';
import { DashbordComponent } from "./dashbord/dashbord.component";
import { DashbordListComponent } from "./dashbord-list/dashbord-list.component";

const routes: Routes = [  
  {path:'',redirectTo:'dashbordList',pathMatch:'full'},
  { path: 'dashboardCreate', component: DashbordComponent,data: { breadcrumb: 'Dashbord' },canActivate:  []},
  { path: 'dashbordList', component: DashbordListComponent,data: { breadcrumb: 'DashbordList',
    id: String},canActivate:  []},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]

})
export class dashbordRoutingModule { }
