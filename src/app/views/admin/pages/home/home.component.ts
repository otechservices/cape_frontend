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
  data:any   // données récupérées depuis ton backend
  statsCards: any[] = [];

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
          this.buildDashboard();
    },
    (err:any)=>{

    })
  }


   buildDashboard() {
    const common:any = {
      ddasm: [
        { title: 'Dossiers à valider', value: this.data.pending_validation, bgColor: 'tw-bg-orange-500', textColor: 'tw-text-white', path: '/admin/requetes/new' },
        { title: 'Contrôles effectués', value: this.data.controls, bgColor: 'tw-bg-red-500', textColor: 'tw-text-white', path: '/admin/referals' },
        { title: 'Cape visités', value: this.data.total, bgColor: 'tw-bg-blue-600', textColor: 'tw-text-white', path: '/admin/requetes/new' },
      ],
      dfea: [
        { title: 'Recommandations en cours', value: this.data.referals, bgColor: 'tw-bg-cyan-500', textColor: 'tw-text-white', path: '/admin/referals' },
        { title: 'Contrôles effectués', value: this.data.controls, bgColor: 'tw-bg-red-500', textColor: 'tw-text-white', path: '/admin/referals' },
        { title: 'CAPE autorisés', value: this.data.authorized, bgColor: 'tw-bg-green-500', textColor: 'tw-text-white', path: '/admin/capes' },
        { title: 'CAPE inscrits', value: this.data.registered, bgColor: 'tw-bg-gray-500', textColor: 'tw-text-white', path: '/admin/requetes' },
        { title: 'Dossiers à valider', value: this.data.pending_validation, bgColor: 'tw-bg-orange-500', textColor: 'tw-text-white', path: '/admin/requetes/new' },
      ],
      cape: [
        { title: "Nombre d'enfants", value: this.data.residents, bgColor: 'tw-bg-orange-500', textColor: 'tw-text-white', path: '/admin/requetes/new' },
        { title: 'Recommandations en attente', value: this.data.referals, bgColor: 'tw-bg-blue-400', textColor: 'tw-text-white', path: '/admin/referals' },
      ],
      admin: [
        { title: 'Nb utilisateurs', value: this.data.users, bgColor: 'tw-bg-blue-600', textColor: 'tw-text-white', path: '/admin/users' },
        { title: 'CAPE autorisés', value: this.data.authorized, bgColor: 'tw-bg-green-500', textColor: 'tw-text-white', path: '/admin/capes' },
        { title: 'CAPE inscrits', value: this.data.registered, bgColor: 'tw-bg-gray-500', textColor: 'tw-text-white', path: '/admin/requetes' },
      ],
      cps: [
        { title: 'Recommandations en cours', value: this.data.referals, bgColor: 'tw-bg-cyan-500', textColor: 'tw-text-white', path: '/admin/referals' },
        { title: 'Contrôles effectués', value: this.data.controls, bgColor: 'tw-bg-red-500', textColor: 'tw-text-white', path: '/admin/referals' },
        { title: 'CAPE autorisés', value: this.data.authorized, bgColor: 'tw-bg-green-500', textColor: 'tw-text-white', path: '/admin/capes' },
        { title: 'CAPE inscrits', value: this.data.registered, bgColor: 'tw-bg-gray-500', textColor: 'tw-text-white', path: '/admin/requetes' },
      ],
      member: [
        { title: 'Dossiers inscrits', value: this.data.all, bgColor: 'tw-bg-blue-600', textColor: 'tw-text-white', path: '/admin/session-requests' },
        { title: 'Dossiers à valider', value: this.data.treated, bgColor: 'tw-bg-green-500', textColor: 'tw-text-white', path: '/admin/session-requests' },
      ]
    };

    this.statsCards = common[this.role] || [];
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
