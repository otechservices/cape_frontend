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
{ id: 'staff', label: 'Personnels', icon: 'ri-user-2-line' },
  { id: 'residents', label: 'Pensionnaires', icon: 'ri-team-line' },
  { id: 'referals', label: 'Recommandations', icon: 'ri-book-mark-line' },
  { id: 'activity-report', label: "Rapport d'activité", icon: 'ri-file-list-3-line' },

  // Statistiques CAPE
  // { id: 'statistiques/cape-inscrits/cape', label: 'CAPE inscrits', icon: 'ri-file-list-line' },
  // { id: 'statistiques/cape-autorises/cape', label: 'CAPE autorisés', icon: 'ri-check-line' },
  // { id: 'statistiques/controls/cape', label: 'Visites de terrain', icon: 'ri-map-pin-line' },

  // Statistiques Garderie
  // { id: 'statistiques/cape-inscrits/garderie', label: 'Garderies inscrites', icon: 'ri-file-list-line' },
  // { id: 'statistiques/cape-autorises/garderie', label: 'Garderies autorisées', icon: 'ri-check-line' },
  // { id: 'statistiques/controls/garderie', label: 'Visites de terrain', icon: 'ri-map-pin-line' },

  // Recherche CAPE
  // { id: 'search/cape-inscrits/cape', label: 'CAPE inscrits', icon: 'ri-file-list-line' },
  // { id: 'search/cape-autorises/cape', label: 'CAPE autorisés', icon: 'ri-check-line' },

  // Recherche Garderie
  // { id: 'search/cape-inscrits/garderie', label: 'Garderie inscrites', icon: 'ri-file-list-line' },
  // { id: 'search/cape-autorises/garderie', label: 'Garderie autorisées', icon: 'ri-check-line' },


    { id: 'assistance-en-ligne', label: 'Assistance en ligne', icon: 'ri-customer-service-line' },
    { id: 'mon-profil-promoteur', label: 'Mon Profil', icon: 'ri-user-line' }


  ];
menuOpen = false;
  constructor(private router:Router){

  }


  toggleMenu() {
  this.menuOpen = !this.menuOpen;
}


  goTo(id:any){
    this.activeSection=id
    this.router.navigate(['/promoter/'+id])
  }
}
