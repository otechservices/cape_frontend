import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

/**
 * Création d'un compte promoteur à partir du lien reçu par email.
 * Appels publics : le jeton du lien tient lieu d'authentification.
 */
@Injectable({
  providedIn: 'root'
})
export class PromoterInvitationService {
  url = ConfigService.toApiUrl('promoter-invitations/');

  constructor(private http: HttpClient) { }

  get(token: string) {
    return this.http.get<any>(`${this.url}${token}`, ConfigService.httpHeader(null, true));
  }

  accept(token: string, ressource: any) {
    return this.http.post<any>(`${this.url}${token}/accept`, ressource, ConfigService.httpHeader(null, true));
  }
}
