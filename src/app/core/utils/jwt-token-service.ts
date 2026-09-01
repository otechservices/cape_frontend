import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { LocalStorageService } from './local-stoarge-service';
import { GlobalName } from './global-name';

@Injectable({
    providedIn: 'root'
})
export class JWTTokenService {

    jwtToken: string | undefined;
    decodedToken: { [key: string]: string; } | undefined;

    constructor(
      private lsService:LocalStorageService
    ) {
    }

    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }

    decodeToken(token: string) {
      if (token) {
      this.decodedToken = jwt_decode(token);
      }
      return this.decodedToken
    }

    getDecodeToken() {
      return jwt_decode(this.jwtToken??'');
    }

    getUser(token:any) {
      this.decodeToken(token);
      return this.decodedToken ? this.decodedToken['displayname'] : null;
    }

    getEmailId(token:any) {
      this.decodeToken(token);
      return this.decodedToken ? this.decodedToken['email'] : null;
    }

    getExpiryTime(token:any) {
     let decodedToken= this.decodeToken(token);
      return decodedToken ? decodedToken['exp'] : '0';
    }

    /**
     * Échéance de la session, ou null si elle n'est pas déterminable.
     *
     * La revendication `exp` du jeton passe en premier : elle est présente quel
     * que soit l'espace, alors que `capeExpireIn` n'est enregistré que par la
     * connexion de l'administration.
     */
    private getExpiryDate(token:any): Date | null {
      try {
        const exp = (this.decodeToken(token) as any)?.exp;
        if (typeof exp === 'number') {
          return new Date(exp * 1000);
        }
      } catch {
        // jeton illisible : on se rabat sur la date enregistrée
      }

      const stockee = this.lsService.get(GlobalName.expireIn);
      if (!stockee) {
        return null;
      }
      const date = new Date(stockee);
      return isNaN(date.getTime()) ? null : date;
    }

    /**
     * Vrai seulement si l'échéance est connue et dépassée.
     *
     * La comparaison porte sur des horodatages. L'implémentation précédente
     * comparait deux chaînes formatées en `hh` — c'est-à-dire sur 12 heures :
     * 13:00 s'y écrivait « 01:00 » et passait donc pour antérieur à 09:00, ce
     * qui rendait le verdict faux une demi-journée sur deux.
     */
    isTokenExpired(token:any): boolean {
      const echeance = this.getExpiryDate(token);
      return echeance !== null && echeance.getTime() <= Date.now();
    }
}