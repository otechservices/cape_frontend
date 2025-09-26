import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicAuthLayoutComponent } from './public-auth-layout/public-auth-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';


const routes: Routes = [
  {path: '', redirectTo: '/auth/login',pathMatch:'full'},
  {
    path: 'auth',
    component:PublicAuthLayoutComponent,
    children:[
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"register",
        component:RegisterComponent
      }
    
    ]
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicAuthRoutingModule { }
