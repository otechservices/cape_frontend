import { Component, OnInit } from '@angular/core';
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

  loading=false
 
  constructor(
    private authService:AuthService,
    private lsService:LocalStorageService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }


  login(value:any){
    //this.router.navigate(['/admin/dashboard'])

    this.loading=true
    this.authService.login(value).subscribe((res:any)=>{
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
      this.toastr.error('Connexion échouée', 'Connexion');

    });
  }

}
