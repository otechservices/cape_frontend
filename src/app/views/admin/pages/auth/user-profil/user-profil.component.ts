import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  loading=false
  user:any;
  constructor(
    
    private authService:AuthService,
    private userService:UserService,
    private lsService:LocalStorageService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)

  }


  
  update(value:any){
    this.loading=true
    this.authService.update(value).subscribe((res:any)=>{
      this.loading=false
      this.lsService.set(GlobalName.userName,res.data);
      this.user=res.data
      this.toastr.success('Sauvegarde des informations du compte', 'Mon compte');
    },
    (err:any)=>{
      this.loading=false
      this.toastr.success('Sauvegarde des informations échouée', 'Mon compte');

    });
  }

  changePassword(value:any){
    this.loading=true
    this.authService.changePassword(value).subscribe((res:any)=>{
      this.loading=false
      this.toastr.success('Changement de mot de passe du compte', 'Mon compte');
      this.logout()
    },
    (err:any)=>{
      this.loading=false
      this.toastr.error('Changement de mot de passe échouée', 'Mon compte');

    });
  }

  logout(){
    this.authService.logout().subscribe((res:any)=>{
      this.lsService.remove(GlobalName.tokenName)
      this.lsService.remove(GlobalName.refreshTokenName)
      this.lsService.remove(GlobalName.expireIn)
      this.router.navigate(['/admin/auth/login'])
      this.toastr.success('Déconnexion réussie', 'Connexion');
    }),
    ((err:any)=>{
      console.log(err)
      this.toastr.success('Déconnexion échouée', 'Connexion');

    });
  }

  signCode(value:any, form:NgForm){

    if (value.sign_code != value.sign_code_confirm) {
      this.toastr.error('Les deux codes ne sont pas identiques', 'Code de signature')
      return ;
    }
    this.loading=true
    this.userService.signCode(value).subscribe((res:any)=>{
        form.reset()
      this.toastr.success('Sauvegarde des informations du compte', 'Mon compte');
    },
    (err:any)=>{
      this.loading=false
      this.toastr.error('Sauvegarde des informations échouée', 'Mon compte');

    });
  }
}
