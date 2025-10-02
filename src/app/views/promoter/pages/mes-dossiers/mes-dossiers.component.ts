import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/services/file.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-mes-dossiers',

  templateUrl: './mes-dossiers.component.html',
  styleUrl: './mes-dossiers.component.css'
})
export class MesDossiersComponent {
 dossiers: any[] = [];

  activeTab: string = 'tous';
  dossierSelectionne: string | null = null;


    constructor(
      private requeteService:RequeteService,
        private router:Router,
        private activatedRoute:ActivatedRoute,
        private _sanitizationService: DomSanitizer,
        configOffCanvas: NgbOffcanvasConfig,
         private offcanvasService: NgbOffcanvas,
         private toastrService: ToastrService,
         private fileService:FileService,
         private lsService:LocalStorageService
    ) {}

    ngOnInit(){
      this.getDossiers()
    }


      getDossiers(){
    this.requeteService.getAll().subscribe((res:any)=>{
      this.dossiers=res.data
    },
    (err:any)=>{

    })
  }

  filtrerDossiers(): any[] {

    
/** status check
 * 0 : Nouvelle
 * 1 : Mise en attente
 * 2 : Rejeté
 * 3 : Corrigé
 * 4 : Validé
 * 5 : Finalisé
 * 6 : Visa-DDASM
 * 7 : A inscrire
 * 8 : Inscription avec agrément
 */
    switch (this.activeTab) {
      case 'en-cours':
        return this.dossiers.filter(d => d.status === 0);
      case 'autorises':
        return this.dossiers.filter(d => d.status === 8);
      case 'refuses':
        return this.dossiers.filter(d => d.status === 2);
      default:
        return this.dossiers;
    }
  }

    getStatus(statut: any): string {
    switch (statut) {
      case 0: return 'Nouvelle';
      case 1: return 'Mise en attente';
      case 3: return 'Corrigé';
      case 4: return 'Validé';
      case 5: return 'Finalisé';
      case 6: return 'Visa-DDASM';
      case 7: return 'A inscrire';
      case 2: return 'Rejeté';
      case 8: return 'Inscription avec agrément';
      default: return 'Non défini';
    }
  }

  getStatutColor(statut: any): string {
    switch (statut) {
      case 0: return 'bg-yellow-100 text-yellow-800';
      case 1: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-yellow-100 text-yellow-800';
      case 5: return 'bg-yellow-100 text-yellow-800';
      case 6: return 'bg-yellow-100 text-yellow-800';
      case 7: return 'bg-green-100 text-green-800';
      case 2: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getEtapeStatutColor(statut: any): string {
    switch (statut) {
      case 5: return 'bg-green-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-blue-500';
      case 6: return 'bg-blue-500';

      case 0: return 'bg-gray-300';
      case 1: return 'bg-gray-300';

      default: return 'bg-gray-300';
    }
  }

  getDocumentStatutColor(statut: any): string {
    switch (statut) {
      case 'valide': return 'bg-green-100 text-green-800';
      case 'manquant': return 'bg-red-100 text-red-800';
      case 'refuse': return 'bg-red-100 text-red-800';
      case 'genere': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  setActiveTab(tab: string) {
    this.dossierSelectionne=null
    this.activeTab = tab;
  }

  selectDossier(id: string) {
    this.dossierSelectionne = id;
  }

}
