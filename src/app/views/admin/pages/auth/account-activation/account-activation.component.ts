import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {
  loading:any
  
    constructor(
      
      private authService:AuthService,
      private router: Router,
      private route:ActivatedRoute,
      private toastr: ToastrService,
      private lsService:LocalStorageService

    ) { }
  
    ngOnInit(): void {
 
      
    }
  
  
    changeFirstPassword(value:any){

      if (value.password != value.confirm_password) {
        this.toastr.error('Nouveaux mots de passe non identique', 'Mot de passe oublié');
        return ;
      }
      this.loading=true
      this.authService.changeFirstPassword(value).subscribe((res:any)=>{
        this.loading=false
        this.logout()
        this.toastr.success('Changement de mot passe réussi', 'Première connexion');

       
      },
      (err:any)=>{
        this.loading=false
        this.toastr.error('Changement de mot passe échoué', 'Première connexion');
  
      });
    }

   
    logout(){
      this.authService.logout().subscribe((res:any)=>{
        this.lsService.remove(GlobalName.tokenName)
        this.lsService.remove(GlobalName.refreshTokenName)
        this.lsService.remove(GlobalName.expireIn)
        this.router.navigate(['/admin/auth/login'])
        this.toastr.success('Déconnexion réussie', 'Première Connexion');
      }),
      ((err:any)=>{
        console.log(err)
        this.toastr.success('Déconnexion échouée', 'Première Connexion');
  
      });
    }
}


