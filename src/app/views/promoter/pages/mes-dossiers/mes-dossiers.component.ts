import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/services/file.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { ConfigService } from 'src/app/core/utils/config-service';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-mes-dossiers',
  templateUrl: './mes-dossiers.component.html',
  styleUrl: './mes-dossiers.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MesDossiersComponent implements OnInit {

  dossiers: any[] = [];
  @ViewChild('previewContent') previewContent: any;
  url: SafeResourceUrl | undefined;
  activeTab = 'tous';
  activeDetailTab = 'infos';
  dossierSelectionne: any = null;
  loading = false;

  constructor(
    private requeteService: RequeteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _sanitizationService: DomSanitizer,
    private offcanvasService: NgbOffcanvas,
    configOffCanvas: NgbOffcanvasConfig,
    private toastrService: ToastrService,
    private fileService: FileService,
    private lsService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getDossiers();
  }

  getDossiers(): void {
    this.loading = true;
    this.requeteService.getAll().subscribe({
      next: (res: any) => {
        this.dossiers = res.data ?? [];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  // ── Getters stats ────────────────────────────────────────────────────────────
  get totalCount()      { return this.dossiers.length; }
  get enCoursCount()    { return this.dossiers.filter(d => d.status !== 2 && d.status !== 8).length; }
  get autorisesCount()  { return this.dossiers.filter(d => d.status === 8).length; }
  get refusesCount()    { return this.dossiers.filter(d => d.status === 2).length; }

  get dossierDetails(): any {
    return this.dossiers.find(d => d.id === this.dossierSelectionne) ?? null;
  }

  // ── Filtrage ────────────────────────────────────────────────────────────────
  filtrerDossiers(): any[] {
    switch (this.activeTab) {
      case 'en-cours':   return this.dossiers.filter(d => d.status !== 2 && d.status !== 8);
      case 'autorises':  return this.dossiers.filter(d => d.status === 8);
      case 'refuses':    return this.dossiers.filter(d => d.status === 2);
      default:           return this.dossiers;
    }
  }

  setActiveTab(tab: string): void {
    this.dossierSelectionne = null;
    this.activeTab = tab;
  }

  selectDossier(id: any): void {
    this.dossierSelectionne = id;
    this.activeDetailTab = 'infos';
  }

  setDetailTab(tab: string): void {
    this.activeDetailTab = tab;
  }

  // ── Labels ──────────────────────────────────────────────────────────────────
  getStatus(status: any): string {
    const labels: Record<number, string> = {
      0: 'Nouvelle',
      1: 'Mise en attente',
      2: 'Rejeté',
      3: 'Corrigé',
      4: 'Validé',
      5: 'Finalisé',
      6: 'Visa-DDASM',
      7: 'À inscrire',
      8: 'Autorisé',
      9: 'Agréé (avant plateforme)',
      10: 'Agrément en validation DFEA',
    };
    return labels[status] ?? 'Non défini';
  }

  // ── Couleurs statut (classes tw- pour les badges) ────────────────────────────
  getStatutColor(status: any): string {
    switch (status) {
      case 0: return 'tw-bg-blue-100 tw-text-blue-700';
      case 1: return 'tw-bg-amber-100 tw-text-amber-700';
      case 2: return 'tw-bg-red-100 tw-text-red-700';
      case 3: return 'tw-bg-blue-100 tw-text-blue-700';
      case 4: return 'tw-bg-green-100 tw-text-green-700';
      case 5: return 'tw-bg-green-100 tw-text-green-700';
      case 6: return 'tw-bg-purple-100 tw-text-purple-700';
      case 7: return 'tw-bg-indigo-100 tw-text-indigo-700';
      case 8: return 'tw-bg-green-100 tw-text-green-800';
      case 10: return 'tw-bg-cyan-100 tw-text-cyan-700';
      default: return 'tw-bg-gray-100 tw-text-gray-600';
    }
  }

  // ── Couleur point timeline ────────────────────────────────────────────────────
  getEtapeStatutColor(status: any): string {
    switch (status) {
      case 8: return 'tw-bg-green-500';
      case 5: return 'tw-bg-green-500';
      case 4: return 'tw-bg-blue-500';
      case 3: return 'tw-bg-blue-400';
      case 6: return 'tw-bg-purple-500';
      case 7: return 'tw-bg-indigo-500';
      case 2: return 'tw-bg-red-500';
      case 1: return 'tw-bg-amber-400';
      default: return 'tw-bg-gray-300';
    }
  }

  getStatusIcon(status: any): string {
    const icons: Record<number, string> = {
      0: 'ri-file-text-line',
      1: 'ri-time-line',
      2: 'ri-close-circle-line',
      3: 'ri-refresh-line',
      4: 'ri-check-line',
      5: 'ri-check-double-line',
      6: 'ri-seal-line',
      7: 'ri-edit-line',
      8: 'ri-award-line',
    };
    return icons[status] ?? 'ri-file-line';
  }

  getCorrectionRoute(dossier: any): string {
    return dossier?.type_cape?.name?.toLowerCase() === 'cape'
      ? `/promoter/inscription-cape/${dossier.code}`
      : `/promoter/inscription-garderie/${dossier.code}`;
  }

  showFile(filename: any, dossier?: any): void {
    this.url = this._sanitizationService.bypassSecurityTrustResourceUrl(
      ConfigService.toFile('docs/' + dossier?.code + '/' + filename)
    );
    this.offcanvasService.open(this.previewContent, { panelClass: 'details-panel', position: 'start' });
  }
}
