import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalName } from '../utils/global-name';
import { JWTTokenService } from '../utils/jwt-token-service';
import { LocalStorageService } from '../utils/local-stoarge-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private jwtService: JWTTokenService,
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
        // if (this.jwtService.isTokenExpired(token)) {
        //   this.lsService.remove(GlobalName.tokenName)
        //   this.lsService.remove(GlobalName.refreshTokenName)
        //   this.lsService.remove(GlobalName.expireIn)
        //   this.router.navigate(['/admin/auth/login']);
        //   return false;
        // } else {
          return true;
       // }
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
