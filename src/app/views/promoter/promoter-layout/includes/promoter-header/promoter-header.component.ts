import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-promoter-header',
  templateUrl: './promoter-header.component.html',
  styleUrl: './promoter-header.component.css'
})
export class PromoterHeaderComponent {
  userEmail: string | null = null;

  constructor(private router: Router,    
    private authService:AuthService,
        private lsService:LocalStorageService,
            private toastr:ToastrService,
        
    
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail');
  }

  handleLogout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/']); // Redirection vers la page d’accueil
  }


    logout(){
      this.authService.logout().subscribe((res:any)=>{
        this.lsService.remove(GlobalName.tokenName)
        this.lsService.remove(GlobalName.refreshTokenName)
        this.lsService.remove(GlobalName.expireIn)
        this.lsService.remove(GlobalName.userName)
        this.lsService.remove(GlobalName.exercice)
        this.router.navigate(['/public/auth/login'])
        this.toastr.success('Déconnexion réussie', 'Connexion');
      }),
      ((err:any)=>{
        console.log(err)
        this.lsService.remove(GlobalName.tokenName)
        this.lsService.remove(GlobalName.refreshTokenName)
        this.lsService.remove(GlobalName.expireIn)
        this.lsService.remove(GlobalName.userName)
        this.lsService.remove(GlobalName.exercice)
        this.router.navigate(['/public/auth/login'])
        this.toastr.success('Déconnexion échouée', 'Connexion');
  
      });
    }
}
