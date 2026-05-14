import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';
import {
  AcaibMenu, AdminMenu, CapeMenu, CpsMenu, DDASMMenu,
  DFEAMenu, MemberMenu, MinistreMenu, ServiceMenu
} from '../menu';

const ALL_MENUS = [AdminMenu, MinistreMenu, CpsMenu, DDASMMenu, DFEAMenu, MemberMenu, CapeMenu, ServiceMenu, AcaibMenu];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: any;
  role: any;
  pageTitle = 'Tableau de bord';
  showUserMenu = false;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private lsService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.role = this.user.roles[0].name;
    this.updateTitle(this.router.url);

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((e: any) => {
      this.updateTitle(e.urlAfterRedirects);
      this.showUserMenu = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateTitle(url: string): void {
    for (const menu of ALL_MENUS) {
      for (const item of menu) {
        if (item.route && (url === item.route || url.startsWith(item.route + '/'))) {
          this.pageTitle = item.name ?? '';
          return;
        }
        if (item.children) {
          for (const child of item.children) {
            if (child.route && (url === child.route || url.startsWith(child.route + '/'))) {
              this.pageTitle = child.name ?? '';
              return;
            }
          }
        }
      }
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu-wrapper')) {
      this.showUserMenu = false;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.clearSession();
        this.toastr.success('Déconnexion réussie', 'Connexion');
      },
      error: () => {
        this.clearSession();
        this.toastr.error('Déconnexion forcée', 'Connexion');
      }
    });
  }

  private clearSession(): void {
    this.lsService.remove(GlobalName.tokenName);
    this.lsService.remove(GlobalName.refreshTokenName);
    this.lsService.remove(GlobalName.expireIn);
    this.lsService.remove(GlobalName.userName);
    this.lsService.remove(GlobalName.exercice);
    this.router.navigate(['/admin/auth/login']);
  }
}
