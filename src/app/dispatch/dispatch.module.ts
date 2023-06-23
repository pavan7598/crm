import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispatchComponent } from './dispatch.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

export const routes = [
  {path:'',component:DispatchComponent ,pathMatch:'full'},
]

@NgModule({
  declarations: [DispatchComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
 
  ]
})
export class DispatchModule { }
