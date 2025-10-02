import { Component } from '@angular/core';

@Component({
  selector: 'app-assistance-enligne',
  templateUrl: './assistance-enligne.component.html',
  styleUrl: './assistance-enligne.component.css'
})
export class AssistanceEnligneComponent {
 activeTab: 'nouveau' | 'mes-tickets' = 'nouveau';

  tickets: any[] = [
    {
      id: 'T-2024-001',
      sujet: 'Question sur dossier CAPE',
      statut: 'En cours',
      priorite: 'Normale',
      dateCreation: '2024-01-15',
      derniereReponse: '2024-01-16',
      messages: [
        {
          id: 1,
          auteur: 'Client',
          message: "Bonjour, j'aimerais savoir où en est mon dossier CAPE-2024-0123. Merci.",
          date: '2024-01-15 14:30',
          type: 'client'
        },
        {
          id: 2,
          auteur: 'Support',
          message: 'Bonjour, votre dossier est actuellement en cours de traitement par nos services. Nous vous tiendrons informé sous 48h.',
          date: '2024-01-16 09:15',
          type: 'support'
        }
      ]
    },
    {
      id: 'T-2024-002',
      sujet: 'Modification coordonnées',
      statut: 'Résolu',
      priorite: 'Faible',
      dateCreation: '2024-01-10',
      derniereReponse: '2024-01-12',
      messages: [
        {
          id: 1,
          auteur: 'Client',
          message: 'Je souhaite modifier mon adresse email dans mon profil.',
          date: '2024-01-10 16:20',
          type: 'client'
        },
        {
          id: 2,
          auteur: 'Support',
          message: 'Modification effectuée. Vous recevrez un email de confirmation.',
          date: '2024-01-12 10:30',
          type: 'support'
        }
      ]
    }
  ];

  nouveauTicket = {
    sujet: '',
    categorie: '',
    priorite: 'normale',
    message: ''
  };

  ticketSelectionne: string | null = null;
  nouvelleReponse = '';
  isSubmitting = false;

  async handleNouveauTicketSubmit() {
    this.isSubmitting = true;
    await new Promise(res => setTimeout(res, 1500));

    const nouveauId = `T-${new Date().getFullYear()}-${String(this.tickets.length + 1).padStart(3, '0')}`;
    const ticket: any = {
      id: nouveauId,
      sujet: this.nouveauTicket.sujet,
      statut: 'Ouvert',
      priorite: this.nouveauTicket.priorite === 'normale' ? 'Normale' :
                this.nouveauTicket.priorite === 'urgente' ? 'Urgente' : 'Faible',
      dateCreation: new Date().toISOString().split('T')[0],
      derniereReponse: new Date().toISOString().split('T')[0],
      messages: [{
        id: 1,
        auteur: 'Client',
        message: this.nouveauTicket.message,
        date: new Date().toLocaleString('fr-FR'),
        type: 'client'
      }]
    };

    this.tickets = [ticket, ...this.tickets];
    this.nouveauTicket = { sujet: '', categorie: '', priorite: 'normale', message: '' };
    this.isSubmitting = false;
    this.activeTab = 'mes-tickets';
  }

  async handleReponseSubmit() {
    if (!this.ticketSelectionne || !this.nouvelleReponse.trim()) return;

    this.isSubmitting = true;
    await new Promise(res => setTimeout(res, 1000));

    this.tickets = this.tickets.map(ticket => {
      if (ticket.id === this.ticketSelectionne) {
        return {
          ...ticket,
          messages: [
            ...ticket.messages,
            {
              id: ticket.messages.length + 1,
              auteur: 'Client',
              message: this.nouvelleReponse,
              date: new Date().toLocaleString('fr-FR'),
              type: 'client'
            }
          ],
          derniereReponse: new Date().toISOString().split('T')[0],
          statut: 'En cours'
        };
      }
      return ticket;
    });

    this.nouvelleReponse = '';
    this.isSubmitting = false;
  }

  getStatutColor(statut: string) {
    switch (statut) {
      case 'Ouvert': return 'bg-blue-100 text-blue-800';
      case 'En cours': return 'bg-yellow-100 text-yellow-800';
      case 'Résolu': return 'bg-green-100 text-green-800';
      case 'Fermé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getPrioriteColor(priorite: string) {
    switch (priorite) {
      case 'Urgente': return 'bg-red-100 text-red-800';
      case 'Normale': return 'bg-blue-100 text-blue-800';
      case 'Faible': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
