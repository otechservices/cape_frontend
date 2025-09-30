import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashService } from 'src/app/core/services/dash.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:any
  role:any
  data:any

   statsCards = [
    { title: 'Recommandations en cours', value: '15', bgColor: 'tw-bg-cyan-500', textColor: 'tw-text-white', path: '/cape-recommendations' },
    { title: 'Contrôles effectués', value: '128', bgColor: 'tw-bg-red-500', textColor: 'tw-text-white', path: '/controle-capes-autorises' },
    { title: 'CAPE autorisés', value: '74', bgColor: 'tw-bg-green-500', textColor: 'tw-text-white', path: '/controle-capes-autorises' },
    { title: 'CAPE inscrits', value: '45', bgColor: 'tw-bg-gray-500', textColor: 'tw-text-white', path: '/dossiers-cape-inscrire' },
    { title: 'Dossiers à valider', value: '8', bgColor: 'tw-bg-orange-500', textColor: 'tw-text-white', path: '/a-valider' }
  ];

  activitesRecentes = [
    { id: 1, type: 'Nouvelle demande', description: "Orphelinat Mère Brandis - Demande d'autorisation", heure: 'Il y a 2 heures', icon: 'ri-file-add-line', iconColor: 'tw-text-blue-500' },
    { id: 2, type: 'Visite programmée', description: 'Centre ASSAFWA - Visite de terrain prévue', heure: 'Il y a 4 heures', icon: 'ri-calendar-line', iconColor: 'tw-text-green-500' },
    { id: 3, type: 'Rapport transmis', description: 'Orphelinat Saint Jean Paul II - Rapport mensuel', heure: 'Il y a 6 heures', icon: 'ri-file-text-line', iconColor: 'tw-text-purple-500' },
    { id: 4, type: 'Validation requise', description: 'Centre OHANA - Dossier en attente de validation', heure: 'Il y a 1 jour', icon: 'ri-alert-line', iconColor: 'tw-text-orange-500' }
  ];

  actionsRapides = [
    { title: 'Nouvelle visite', icon: 'ri-add-circle-line', path: '/visite-terrain' },
    { title: 'Valider dossier', icon: 'ri-check-line', path: '/a-valider' },
    { title: 'Gérer sessions', icon: 'ri-calendar-line', path: '/sessions' },
    { title: 'Voir statistiques', icon: 'ri-bar-chart-line', path: '/statistiques' }
  ];

  constructor(
    private router: Router,
    private lsService:LocalStorageService,
    private dashService:DashService
  ) { }

  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
    this.getAll()
  }

  getAll(){
    this.dashService.getAll().subscribe((res:any)=>{
      this.data=res.data
    },
    (err:any)=>{

    })
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
