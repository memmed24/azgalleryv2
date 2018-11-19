import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { RoutingModule } from './routing.module';
import { SiteModule } from './site/site.module';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RoutingModule,
    DashboardModule,
    SiteModule,
    NgProgressModule,
    NgbModule
  ],
  providers: [CookieService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
