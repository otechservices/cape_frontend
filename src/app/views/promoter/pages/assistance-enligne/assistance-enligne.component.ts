import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BillingResponseService } from 'src/app/core/services/billing-response.service';
import { BillingService } from 'src/app/core/services/billing.service';
import { FileService } from 'src/app/core/services/file.service';
import { TypeBillingService } from 'src/app/core/services/type-billing.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-assistance-enligne',
  templateUrl: './assistance-enligne.component.html',
  styleUrl: './assistance-enligne.component.css'
})
export class AssistanceEnligneComponent {
 activeTab: 'nouveau' | 'mes-tickets' = 'nouveau';

  tickets: any[] = [];
  typeBillings: any[] = []
  nouveauTicket = {
    object: '',
    user_id:'',
    type_billing_id: '',
    priorite: 'Normale',
    content: ''
  };

  ticketSelectionne: string | null = null;
  nouvelleReponse = '';
  isSubmitting = false;
  user:any

    constructor(
        private tpService:TypeBillingService,
        private billingService:BillingService,
        private responseService:BillingResponseService,
          private router:Router,
          private activatedRoute:ActivatedRoute,
          private _sanitizationService: DomSanitizer,
                   private offcanvasService: NgbOffcanvas,
          configOffCanvas: NgbOffcanvasConfig,
           private toastrService: ToastrService,
           private fileService:FileService,
           private lsService:LocalStorageService
      ) {}
  
      ngOnInit(){
         this.user=this.lsService.get(GlobalName.userName)
        
        this.getTypeBilling()
        this.getBillings()
      }
  
  
        getTypeBilling(){
      this.tpService.getAll().subscribe((res:any)=>{
        this.typeBillings=res.data
      },
      (err:any)=>{
  
      })
    }

     getBillings(){
      this.billingService.getAll().subscribe((res:any)=>{
        this.tickets=res.data
      },
      (err:any)=>{
  
      })
    }

  async handleNouveauTicketSubmit() {
    this.isSubmitting = true;
    this.nouveauTicket.user_id=this.user?.id
     this.billingService.store(this.nouveauTicket).subscribe((res:any)=>{
         this.nouveauTicket = { object: '',user_id:'', type_billing_id: '', priorite: 'normale', content: '' };
          this.isSubmitting = false;
          this.activeTab = 'mes-tickets';
      },
      (err:any)=>{
      this.isSubmitting = false;

      })  
  }

  async handleReponseSubmit() {
    if (!this.ticketSelectionne || !this.nouvelleReponse.trim()) return;

  this.isSubmitting = true;
     this.billingService.storeResponse({
      content:this.nouvelleReponse,
      billing_id:this.ticketSelectionne,
      sens:'in'
     }).subscribe((res:any)=>{
          this.nouvelleReponse = '';
          this.isSubmitting = false;
          this.getBillings()

          this.tickets = this.tickets.map(ticket => {
      if (ticket.id === this.ticketSelectionne) {
        return {
          ...ticket,
          messages: [
            ...ticket.responses,
            {
              id: ticket.responses.length + 1,
              auteur: 'Client',
              content: this.nouvelleReponse,
              date: new Date().toLocaleString('fr-FR'),
              sens: 'in'
            }
          ],
          derniereReponse: new Date().toISOString().split('T')[0],
          statut: 'En cours'
        };
      }
      return ticket;
    });
      },
      (err:any)=>{
      this.isSubmitting = false;

      })  
    

  
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
