import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';
import * as $ from 'jquery'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any
  role:any
  constructor(
    
    private authService:AuthService,
    private router: Router,
    private toastr:ToastrService,
    private lsService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name

    $(".nav-toggle-icon").on("click", function() {
      $(".wrapper").toggleClass("toggled")
    })
  
      $(".mobile-toggle-icon").on("click", function() {
      $(".wrapper").addClass("toggled")
    })
  
  }
  logout(){
    this.authService.logout().subscribe((res:any)=>{
      this.lsService.remove(GlobalName.tokenName)
      this.lsService.remove(GlobalName.refreshTokenName)
      this.lsService.remove(GlobalName.expireIn)
      this.lsService.remove(GlobalName.userName)
      this.lsService.remove(GlobalName.exercice)
      this.router.navigate(['/admin/auth/login'])
      this.toastr.success('Déconnexion réussie', 'Connexion');
    }),
    ((err:any)=>{
      console.log(err)
      this.lsService.remove(GlobalName.tokenName)
      this.lsService.remove(GlobalName.refreshTokenName)
      this.lsService.remove(GlobalName.expireIn)
      this.lsService.remove(GlobalName.userName)
      this.lsService.remove(GlobalName.exercice)
      this.router.navigate(['/admin/auth/login'])
      this.toastr.success('Déconnexion échouée', 'Connexion');

    });
  }
}
