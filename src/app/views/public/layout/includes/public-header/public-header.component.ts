import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {
// États
  public visible: boolean = false;           // usage générique (ex: search bar)
  public isLoggedIn: boolean = false;        // bind avec ton auth service si besoin
  public menuOpen: boolean = false;          // menu mobile (aside)
  public openMenu: string | null = null;     // sous-menu ouvert ('inscription', 'deliberations', ...)
  private closeTimeoutId: number | null = null;

  // Référence au root du header pour detecter clics en dehors
  @ViewChild('headerRoot', { static: true }) headerRoot!: ElementRef<HTMLElement>;

  private docClickUnlisten?: () => void;
  private resizeUnlisten?: () => void;

  constructor(private renderer: Renderer2, private hostRef: ElementRef) {}

  ngOnInit(): void {
    // Écoute le clic global pour fermer si on clique en dehors
    this.docClickUnlisten = this.renderer.listen('document', 'click', (event: Event) => {
      this.onDocumentClick(event);
    });

    // Ferme le menu mobile si on redimensionne vers desktop
    this.resizeUnlisten = this.renderer.listen('window', 'resize', () => {
      if (window.innerWidth >= 768 && this.menuOpen) {
        this.menuOpen = false;
        this.openMenu = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.docClickUnlisten) this.docClickUnlisten();
    if (this.resizeUnlisten) this.resizeUnlisten();
    this.clearCloseTimeout();
  }

  /* ---------- toggles simples ---------- */
  manageNavbar(): void {
    this.visible = !this.visible;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) {
      // reset sous-menus quand on ferme le mobile
      this.openMenu = null;
    }
  }

  /* ---------- gestion des sous-menus (hover + click) ---------- */
  openSubmenu(menu: string): void {
    this.clearCloseTimeout();
    this.openMenu = menu;
  }

  // utilisé sur mouseleave du wrapper : démarre un petit timeout avant de fermer
  closeSubmenu(): void {
    this.clearCloseTimeout();
    // délai court pour laisser la souris atteindre le sous-menu
    this.closeTimeoutId = window.setTimeout(() => {
      this.openMenu = null;
      this.closeTimeoutId = null;
    }, 120);
  }

  // toggle utile pour le click (mobile / tactile)
  toggleSubmenu(menu: string): void {
    if (this.openMenu === menu) {
      this.openMenu = null;
    } else {
      this.openMenu = menu;
    }
  }

  private clearCloseTimeout(): void {
    if (this.closeTimeoutId !== null) {
      clearTimeout(this.closeTimeoutId);
      this.closeTimeoutId = null;
    }
  }

  /* ---------- clic en dehors ---------- */
  private onDocumentClick(event: Event): void {
    const target = event.target as Node;
    // hostRef est le composant entier ; headerRoot est la balise header (sécurise si undefined)
    const headerElem = this.headerRoot ? this.headerRoot.nativeElement : this.hostRef.nativeElement;

    if (headerElem && !headerElem.contains(target)) {
      // clic en dehors -> fermer menus
      this.menuOpen = false;
      this.openMenu = null;
    }
  }

  /* ---------- clavier (Escape) ---------- */
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent): void {
    if (this.menuOpen || this.openMenu) {
      this.menuOpen = false;
      this.openMenu = null;
      event.stopPropagation();
    }
  }
}
