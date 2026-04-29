import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicAuthLayoutComponent } from './public-auth-layout/public-auth-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { PublicForgetPasswordComponent } from './Pages/forget-password/forget-password.component';
import { PublicResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { IsAuthedGuard } from 'src/app/core/guards/is-authed.guard';


const routes: Routes = [
  {path: '', redirectTo: '/auth/login',pathMatch:'full'},
  {
    path: 'auth',
    component:PublicAuthLayoutComponent,
    children:[
      {
        path:"login",
        component:LoginComponent,
        canActivate:[IsAuthedGuard]
      },
      {
        path:"register",
        component:RegisterComponent,
        canActivate:[IsAuthedGuard]
      },
      {
        path:"forgot-password",
        component:PublicForgetPasswordComponent
      },
      {
        path:"reset-password/:token",
        component:PublicResetPasswordComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicAuthRoutingModule { }
