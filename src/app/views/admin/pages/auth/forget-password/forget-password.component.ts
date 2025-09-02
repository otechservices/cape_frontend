import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
loading:any
mailSent=false;

  constructor(
    
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }


  sendMail(value:any){
    this.loading=true
    this.authService.sendMail(value).subscribe((res:any)=>{
      this.loading=false
      this.mailSent=true
     
    },
    (err:any)=>{
      this.loading=false
      this.toastr.error('Envoi de mail échoué', 'Récupération de mot de passe');

    });
  }
}
