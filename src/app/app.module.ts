import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MeterialModules } from './meterial/meterial-modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppInterceptor } from './utils/app-interceptor';
import { LandingComponent } from './landing/landing.component';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
// import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
// import { SwiperModule } from 'swiper/angular';
import { RoiDataSummaryComponent } from './landing/roi-data-summary/roi-data-summary.component';


// import { NewreportsComponent } from './newreports/newreports.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    RoiDataSummaryComponent,
 
    
  
   
    // NewreportsComponent,
    
  ],
  imports: [
    BrowserModule,
    MeterialModules,
    routing,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgSelectModule,
    NgxEchartsModule,
    ToastrModule.forRoot(),
    NgxMatSelectSearchModule,
    SharedModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatRadioModule,
    MatSlideToggleModule
    // NgxUsefulSwiperModule
    // SwiperModule
   
   
  
    
  ],
	exports: [
		
	],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
