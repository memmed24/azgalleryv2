import { AdminGuard } from './common/guards/admin.guard';
import { AuthGuard } from './common/guards/auth.guard';
import { RegisterComponent } from './common/register/register.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from './common/login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', loadChildren: './site/site.module#SiteModule'
  },
  {
    path: 'admin', loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '**', redirectTo: ''
  }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);