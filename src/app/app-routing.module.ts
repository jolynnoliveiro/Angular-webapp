import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { BookingOrderComponent } from './pages/booking-order/booking-order.component';
import { HomeComponent } from './pages/home/home.component';
import{ LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UploadFileComponent } from './pages/upload-file/upload-file.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },

  // route that require login
  { path: 'booking-order', component: BookingOrderComponent, canActivate:[AuthGuard] },
  { path: 'upload-file', component: UploadFileComponent, canActivate:[AuthGuard]},

  // route that require admin login
  { path: 'admin', component: AdminComponent, canActivate:[AuthAdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
