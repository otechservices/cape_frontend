import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GlobalName } from '../utils/global-name';
import { JWTTokenService } from '../utils/jwt-token-service';
import { LocalStorageService } from '../utils/local-stoarge-service';

/**
 * Fin de session, quelle qu'en soit la cause.
 *
 * Inactivité, jeton expiré ou 401 renvoyé par l'API aboutissent au même
 * résultat, et le nettoyage était jusqu'ici recopié à chaque endroit — d'où des
 * fermetures partielles : la déconnexion automatique laissait les fenêtres
 * ouvertes par-dessus l'écran de connexion.
 */
@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(
    private lsService: LocalStorageService,
    private jwtService: JWTTokenService,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    private router: Router
  ) {}

  /**
   * Ferme tout ce qui est ouvert par-dessus l'application.
   *
   * Les fenêtres du projet sont ouvertes avec `backdrop: 'static'` : sans
   * fermeture explicite, elles survivent à la navigation et bloquent l'écran
   * de connexion derrière un voile que rien ne permet de lever.
   */
  fermerLesFenetres(): void {
    try { this.modalService.dismissAll(); } catch { /* aucune fenêtre ouverte */ }
    try { this.offcanvasService.dismiss(); } catch { /* aucun panneau ouvert */ }
  }

  /** Efface les traces de la session dans le navigateur. */
  viderLeStockage(): void {
    this.lsService.remove(GlobalName.tokenName);
    this.lsService.remove(GlobalName.refreshTokenName);
    this.lsService.remove(GlobalName.expireIn);
    this.lsService.remove(GlobalName.userName);
    this.lsService.remove(GlobalName.exercice);
  }

  /** Écran de connexion correspondant à l'espace où se trouve l'utilisateur. */
  ecranDeConnexion(urlCible?: string): string {
    // Pendant un canActivate, router.url désigne encore la page quittée : c'est
    // l'URL visée qui dit dans quel espace l'utilisateur cherchait à entrer.
    const url = urlCible ?? this.router.url ?? '';
    const role = this.lsService.get(GlobalName.userName)?.roles?.[0]?.name;

    return url.startsWith('/public') || url.startsWith('/promoter') || role === 'Promoteur'
      ? '/public/auth/login'
      : '/admin/auth/login';
  }

  /**
   * Termine la session : fenêtres fermées, stockage vidé, retour à la connexion.
   *
   * L'ordre compte — la destination est calculée avant le vidage, qui efface
   * le rôle sur lequel elle s'appuie.
   */
  terminer(urlCible?: string): void {
    const destination = this.ecranDeConnexion(urlCible);
    this.fermerLesFenetres();
    this.viderLeStockage();
    this.router.navigate([destination]);
  }

  /**
   * Session expirée d'après le jeton courant.
   *
   * Prudence délibérée : sans échéance lisible, on répond « non expirée ».
   * L'espace promoteur n'enregistre pas de date d'expiration à la connexion ;
   * la traiter comme une expiration déconnecterait tous ses utilisateurs.
   */
  estExpiree(): boolean {
    const token = this.lsService.get(GlobalName.tokenName);
    return token != null && this.jwtService.isTokenExpired(token);
  }
}
