import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

/**
 * Reconnaissance des agréments délivrés hors plateforme.
 *
 * Couvre les deux parcours : la revendication d'un centre déjà agréé chargé par
 * import, et la validation par la DFEA des agréments déclarés à l'inscription.
 */
@Injectable({
  providedIn: 'root'
})
export class AgrementClaimService {
  url = ConfigService.toApiUrl('agrement-claims/');

  constructor(private http: HttpClient) { }

  private get header() {
    return ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName), true);
  }

  /** Construit la query string à partir des filtres non vides. */
  private toQuery(filters: any): string {
    const params = new URLSearchParams();
    Object.keys(filters || {}).forEach(key => {
      const value = filters[key];
      if (value !== null && value !== undefined && value !== '') {
        params.set(key, value);
      }
    });
    return params.toString();
  }

  /** Centres agréés hors plateforme encore revendicables. */
  available(filters: any) {
    return this.http.get<any>(`${this.url}available?${this.toQuery(filters)}`, this.header);
  }

  /** Ouvre une revendication : un code de confirmation part par email. */
  requestOtp(requete_id: any) {
    return this.http.post<any>(`${this.url}request-otp`, { requete_id }, this.header);
  }

  /** Confirme le code et rattache le centre au compte promoteur. */
  verifyOtp(requete_id: any, code: any) {
    return this.http.post<any>(`${this.url}verify-otp`, { requete_id, code }, this.header);
  }

  /** Pièces attendues, avec l'état de chacune. */
  requiredFiles(requete_id: any) {
    return this.http.get<any>(`${this.url}required-files?requete_id=${requete_id}`, this.header);
  }

  /** Dépose ou remplace une pièce. */
  addFile(formData: FormData) {
    return this.http.post<any>(`${this.url}add-file`, formData, this.header);
  }

  /** Transmet le dossier régularisé à la DFEA. */
  submit(formData: FormData) {
    return this.http.post<any>(`${this.url}submit`, formData, this.header);
  }

  /** Les demandes du promoteur connecté. */
  mine() {
    return this.http.get<any>(`${this.url}mine`, this.header);
  }

  /** File d'attente de la DFEA. */
  pending(service_id?: any) {
    return this.http.get<any>(`${this.url}pending?${this.toQuery({ service_id })}`, this.header);
  }

  /** Décision de la DFEA sur un agrément existant. */
  decide(id: any, decision: boolean, observation?: string) {
    return this.http.post<any>(`${this.url}decide`, { id, decision, observation }, this.header);
  }
}
