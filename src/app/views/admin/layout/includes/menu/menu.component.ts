import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';
import { AcaibMenu, AdminMenu, CapeMenu, CpsMenu, DDASMMenu, DFEAMenu, ErrorMenu, MemberMenu, MinistreMenu, ServiceMenu } from '../menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  menu: any[] = [];
  user: any;
  role: any;
  sidebarOpen = false;
  collapsed = false;
  currentUrl = '';
  expandedItems: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private lsService: LocalStorageService
  ) {}

  get userInitial(): string {
    return (this.user?.lastname || this.user?.firstname || '?').charAt(0).toUpperCase();
  }

  get userName(): string {
    return [this.user?.lastname, this.user?.firstname].filter(Boolean).join(' ');
  }

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.role = this.user.roles[0].name;
    this.currentUrl = this.router.url;
    this.collapsed = localStorage.getItem('sidebarCollapsed') === 'true';

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((e: any) => {
      this.currentUrl = e.urlAfterRedirects;
      this.sidebarOpen = false;
    });

    switch (this.role) {
      case 'admin':    this.menu = AdminMenu;    break;
      case 'ministre': this.menu = MinistreMenu; break;
      case 'cps':      this.menu = CpsMenu;      break;
      case 'ddasm':    this.menu = DDASMMenu;    break;
      case 'dfea':     this.menu = DFEAMenu;     break;
      case 'member':   this.menu = MemberMenu;   break;
      case 'cape':     this.menu = CapeMenu;     break;
      case 'service':  this.menu = ServiceMenu;  break;
      case 'Acaib':    this.menu = AcaibMenu;    break;
      default:         this.menu = ErrorMenu;    break;
    }

    // Auto-expand parent if a child matches the current URL
    this.menu.forEach(item => {
      if (item.children && this.isAnyChildActive(item)) {
        if (!this.expandedItems.includes(item.id)) {
          this.expandedItems.push(item.id);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleItemClick(item: any): void {
    if (item.children) {
      if (this.expandedItems.includes(item.id)) {
        this.expandedItems = this.expandedItems.filter((id: string) => id !== item.id);
      } else {
        this.expandedItems.push(item.id);
      }
    } else if (item.route) {
      this.router.navigate([item.route]);
      this.sidebarOpen = false;
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    localStorage.setItem('sidebarCollapsed', String(this.collapsed));
    if (this.collapsed) {
      this.expandedItems = [];
    }
  }

  isActive(route?: string): boolean {
    if (!route) return false;
    return this.currentUrl === route || this.currentUrl.startsWith(route + '/');
  }

  isAnyChildActive(item: any): boolean {
    if (!item.children) return false;
    return item.children.some((child: any) => {
      if (child.route && this.isActive(child.route)) return true;
      if (child.children) return this.isAnyChildActive(child);
      return false;
    });
  }
}
