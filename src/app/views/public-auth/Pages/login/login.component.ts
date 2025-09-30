import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

type SubmitStatus = 'idle' | 'success' | 'error';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm: FormGroup;
  isSubmitting = false;
  submitStatus: SubmitStatus = 'idle';


    constructor(
      private fb: FormBuilder, 
      private router: Router,
      private lsService:LocalStorageService,
      private toastrService:ToastrService,
        private authService:AuthService
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  async handleSubmit() {
    if (this.loginForm.invalid) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';
  this.authService.login(this.loginForm.value).subscribe((res:any)=>{
          this.toastrService.success(res.message)

          this.lsService.set(GlobalName.tokenName,res.data.access_token)

            this.authService.me().subscribe((res:any)=>{
          this.isSubmitting=false
          this.toastrService.success(res.message)

          this.lsService.set(GlobalName.userName,res.data)
          this.router.navigate(['/promoter/dashboard'])
    
        },
        (err:any)=>{
          this.isSubmitting=false
    
          console.log(err)
            AppSweetAlert.simpleAlert("error","Connexion",err.error.message)
        })
    
        },
        (err:any)=>{
          this.isSubmitting=false
    
          console.log(err)
            AppSweetAlert.simpleAlert("error","Connexion",err.error.message)
        })
      
      }
  

  setActiveTab(tab:any){
    
  }
}
