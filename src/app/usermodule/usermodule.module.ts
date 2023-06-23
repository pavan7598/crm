import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProfileupdateComponent } from './profileupdate/profileupdate.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UiComponent } from './ui/ui.component';

 
export const routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  { path: 'register', component: RegisterComponent, pathMatch: 'full'  },
  { path: 'login', component: LoginComponent, pathMatch: 'full'  },
  { path: 'profileupdate', component: ProfileupdateComponent, pathMatch: 'full'  },
  { path: 'ui', component: UiComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileupdateComponent,UiComponent],
  imports: [
    CommonModule,
    SharedModule,
    ImageCropperModule,
    RouterModule.forChild(routes)
  ]
})
export class UsermoduleModule { }
