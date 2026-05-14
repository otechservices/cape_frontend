import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-promoter-header',
  templateUrl: './promoter-header.component.html',
  styleUrl: './promoter-header.component.css'
})
export class PromoterHeaderComponent implements OnInit {

  user: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private lsService: LocalStorageService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
  }

  get userInitial(): string {
    return this.user?.name?.charAt(0)?.toUpperCase() ?? '?';
  }

  get userName(): string {
    return this.user?.name ?? '';
  }
}
