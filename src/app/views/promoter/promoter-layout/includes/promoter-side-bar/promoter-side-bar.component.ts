import { Component } from '@angular/core';
import { Router } from '@angular/router';


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
export class PromoterSideBarComponent {
  activeSection: string = 'dashboard';
menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Accueil', icon: 'ri-home-line' },
    { id: 'inscription-cape', label: 'Inscription CAPE', icon: 'ri-file-add-line' },
    { id: 'inscription-garderie', label: 'Inscription Garderie', icon: 'ri-building-line' },
    { id: 'mes-dossiers', label: 'Mes Dossiers', icon: 'ri-folder-line' },
    { id: 'assistance-en-ligne', label: 'Assistance en ligne', icon: 'ri-customer-service-line' },
    { id: 'mon-profil-promoteur', label: 'Mon Profil', icon: 'ri-user-line' }
  ];

  constructor(private router:Router){

  }


  goTo(id:any){
    this.activeSection=id
    this.router.navigate(['/promoter/'+id])
  }
}
