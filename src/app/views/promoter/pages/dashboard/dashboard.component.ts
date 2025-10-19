import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 quickActions = [
    {
      title: 'Inscription CAPE',
      description: 'Demander une autorisation pour un Centre d\'Accueil de la Petite Enfance',
      icon: 'ri-shield-user-line',
      color: 'tw-bg-green-500',
      action: 'inscription-cape',
      link:'/promoter/inscription-cape'
    },
    {
      title: 'Inscription Garderie',
      description: 'Demander une autorisation pour une garderie',
      icon: 'ri-building-line',
      color: 'tw-bg-blue-500',
      action: 'inscription-garderie',
      link:'/promoter/inscription-garderie'
    },
    {
      title: 'Mes Dossiers',
      description: 'Consulter le statut de vos demandes en cours',
      icon: 'ri-folder-line',
      color: 'tw-bg-orange-500',
      action: 'mes-dossiers',
      link:'/promoter/mes-dossiers'

    },
    {
      title: 'Support',
      description: 'Obtenir de l\'aide ou poser une question',
      icon: 'ri-customer-service-2-line',
      color: 'tw-bg-purple-500',
      action: 'support',
      link:'/promoter/assistance-en-ligne'

    }
  ];

  handleAction(action: string) {
    console.log('Action sélectionnée :', action);
    // ici tu peux router selon l'action
    // this.router.navigate([...])
  }
}
