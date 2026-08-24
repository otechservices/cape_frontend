import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';
import { ToastrService } from 'ngx-toastr';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-promoter-side-bar',
  templateUrl: './promoter-side-bar.component.html',
  styleUrl: './promoter-side-bar.component.css'
})
export class PromoterSideBarComponent implements OnInit {

  activeSection = 'dashboard';
  menuOpen = false;
  user: any = null;

  menuItems: MenuItem[] = [
    { id: 'dashboard',           label: 'Accueil',              icon: 'ri-home-5-line' },
    { id: 'inscription-cape',    label: 'Inscription CAPE',     icon: 'ri-file-add-line' },
    { id: 'inscription-garderie',label: 'Inscription Garderie', icon: 'ri-building-line' },
    { id: 'mes-dossiers',        label: 'Mes Dossiers',         icon: 'ri-folder-2-line' },
    { id: 'regularisation-agrement', label: 'Régulariser un agrément', icon: 'ri-award-line' },
    { id: 'staff',               label: 'Personnels',           icon: 'ri-user-2-line' },
    { id: 'residents',           label: 'Pensionnaires',        icon: 'ri-team-line' },
    { id: 'referals',            label: 'Recommandations',      icon: 'ri-bookmark-line' },
    { id: 'activity-report',     label: "Rapport d'activité",   icon: 'ri-file-chart-line' },
    { id: 'assistance-en-ligne', label: 'Assistance en ligne',  icon: 'ri-customer-service-2-line' },
    { id: 'mon-profil-promoteur',label: 'Mon Profil',           icon: 'ri-user-settings-line' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private lsService: LocalStorageService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.setActiveFromUrl(this.router.url);
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.setActiveFromUrl(e.urlAfterRedirects));
  }

  get userInitial(): string {
    return this.user?.name?.charAt(0)?.toUpperCase() ?? '?';
  }

  get userName(): string {
    return this.user?.name ?? 'Promoteur';
  }

  private setActiveFromUrl(url: string): void {
    const segment = url.replace('/promoter/', '').split('/')[0].split('?')[0];
    this.activeSection = segment || 'dashboard';
  }

  goTo(id: string): void {
    this.menuOpen = false;
    this.router.navigate(['/promoter/' + id]);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession(),
    });
  }

  private clearSession(): void {
    this.lsService.remove(GlobalName.tokenName);
    this.lsService.remove(GlobalName.refreshTokenName);
    this.lsService.remove(GlobalName.expireIn);
    this.lsService.remove(GlobalName.userName);
    this.toastr.success('Déconnexion réussie');
    this.router.navigate(['/public/auth/login']);
  }
}
