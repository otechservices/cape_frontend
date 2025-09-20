import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
authForm: FormGroup;
  isLoading = false;
  loading=false
 
  constructor(
    private authService:AuthService,
    private lsService:LocalStorageService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) { 
      this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    }

  ngOnInit(): void {
  }


  login(){
    //this.router.navigate(['/admin/dashboard'])
    if (this.authForm?.invalid) return;
    const { email, password } = this.authForm?.value;

    this.loading=true
    this.authService.login({ email, password }).subscribe((res:any)=>{
      this.loading=false

      this.lsService.set(GlobalName.tokenName,res.access_token)
      this.lsService.set(GlobalName.refreshTokenName,res.refresh_token)
      this.lsService.set(GlobalName.expireIn,res.expires_at);
     this.authService.me().subscribe((res:any)=>{
      this.lsService.set(GlobalName.userName,res);
      this.router.navigate(['/admin/dashboard'])
      this.toastr.success('Connexion réussie', 'Connexion');
     })
     
    },
    (err:any)=>{
      this.loading=false
      this.toastr.error(err.error?.message, 'Connexion');

    });
  }

}
