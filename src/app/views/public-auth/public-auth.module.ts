import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicAuthRoutingModule } from './public-auth-routing.module';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { PublicForgetPasswordComponent } from './Pages/forget-password/forget-password.component';
import { PublicResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PublicAuthLayoutComponent } from './public-auth-layout/public-auth-layout.component';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PublicAuthLayoutComponent,
    PublicForgetPasswordComponent,
    PublicResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PublicAuthRoutingModule,
    SharedModule,
    ToastrModule.forRoot({     // ⚡ configure le ToastConfig
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ]
})
export class PublicAuthModule { }
