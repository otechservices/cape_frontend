import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalName } from '../utils/global-name';
import { JWTTokenService } from '../utils/jwt-token-service';
import { LocalStorageService } from '../utils/local-stoarge-service';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private jwtService: JWTTokenService,
    private sessionService: SessionService,
    private lsService:LocalStorageService,
    private router:Router) {
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   if (this.lsService.get(GlobalName.tokenName) != null) {
    //     return true;

    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
      let token=this.lsService.get(GlobalName.tokenName) 
      let role=this.lsService.get(GlobalName.userName)?.roles[0]?.name 
        const currentUrl = state.url.toLowerCase(); // URL actuelle (ex: /promoter/dashboard)

      if (token!= null) {
        // Session expirée : on déconnecte sans attendre qu'un appel à l'API
        // revienne en 401. L'utilisateur naviguait jusqu'ici librement dans une
        // interface qui n'avait plus le droit de rien afficher.
        if (this.sessionService.estExpiree()) {
          this.sessionService.terminer(currentUrl);
          return false;
        }
        return true;
    } else {
       if (currentUrl.includes('promoter')) {
      this.router.navigate(['/public/auth/login']);
    } else if (role === 'Promoteur') {
      this.router.navigate(['/public/auth/login']);
    } else {
      this.router.navigate(['/admin/auth/login']);
    }
      return false;
    }
  }
  
}
