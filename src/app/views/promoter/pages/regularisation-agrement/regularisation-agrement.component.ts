import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AgrementClaimService } from 'src/app/core/services/agrement-claim.service';
import { DepartmentService } from 'src/app/core/services/department.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

/**
 * Régularisation d'un centre déjà agréé avant la plateforme.
 *
 * Le promoteur retrouve son centre parmi ceux chargés par l'import, confirme
 * qu'il en est bien le détenteur par un code reçu par email, puis complète le
 * dossier numérique (agrément scanné + pièces obligatoires) avant transmission
 * à la DFEA, seule habilitée à reconnaître l'agrément.
 */
@Component({
  selector: 'app-regularisation-agrement',
  templateUrl: './regularisation-agrement.component.html',
  styleUrls: ['./regularisation-agrement.component.css']
})
export class RegularisationAgrementComponent implements OnInit {

  /** 'recherche' → 'confirmation' → 'dossier' */
  etape: 'recherche' | 'confirmation' | 'dossier' = 'recherche';

  user: any;
  loading = false;
  isSubmitting = false;

  // ── Recherche ──────────────────────────────────────────────────────────────
  searchTerm = '';
  departments: any[] = [];
  municipalities: any[] = [];
  filters: any = { department_id: null, municipality_id: null, service_id: null };
  centres: any[] = [];
  centreCherche = false;

  // ── Confirmation ───────────────────────────────────────────────────────────
  centreSelectionne: any = null;
  otpCode = '';

  // ── Dossier ────────────────────────────────────────────────────────────────
  dossier: any = null;
  requiredFiles: any[] = [];
  fileAggreement: any = null;
  aggreementReference = '';
  aggreementYear: any = null;

  // ── Mes demandes ───────────────────────────────────────────────────────────
  claims: any[] = [];
  url: SafeResourceUrl | undefined;

  constructor(
    private claimService: AgrementClaimService,
    private departmentService: DepartmentService,
    private toastrService: ToastrService,
    private lsService: LocalStorageService,
    private _sanitizationService: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.getDepartments();
    this.getClaims();
  }

  // ── Référentiels ───────────────────────────────────────────────────────────

  getDepartments(): void {
    this.departmentService.getDepartmentWithRelation().subscribe({
      next: (res: any) => { this.departments = res.data ?? []; },
      error: () => { }
    });
  }

  onDepartmentChange(): void {
    this.filters.municipality_id = null;
    this.municipalities = this.departments
      .find((el: any) => el.id == this.filters.department_id)?.municipalities ?? [];
  }

  // ── Étape 1 : retrouver son centre ─────────────────────────────────────────

  rechercher(): void {
    if (!this.searchTerm && !this.filters.department_id && !this.filters.municipality_id) {
      this.toastrService.warning('Renseignez au moins le nom du centre ou sa localisation');
      return;
    }

    this.loading = true;
    this.claimService.available({ ...this.filters, search: this.searchTerm }).subscribe({
      next: (res: any) => {
        this.centres = res.data ?? [];
        this.centreCherche = true;
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        this.toastrService.error(err?.error?.message ?? 'Recherche impossible');
      }
    });
  }

  // ── Étape 2 : confirmer la détention du centre ─────────────────────────────

  revendiquer(centre: any): void {
    AppSweetAlert.confirmBox(
      'question',
      'Confirmer la revendication',
      `Vous déclarez être le promoteur du centre « ${centre.name} ». Un code de confirmation sera envoyé à l'adresse ${this.user?.email}.`
    ).then((result: any) => {
      if (result.value) { this.envoyerCode(centre); }
    });
  }

  private envoyerCode(centre: any): void {
    this.loading = true;
    this.claimService.requestOtp(centre.id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.centreSelectionne = centre;
        this.otpCode = '';
        this.etape = 'confirmation';
        this.toastrService.success(res.message);
      },
      error: (err: any) => {
        this.loading = false;
        this.toastrService.error(err?.error?.message ?? 'Envoi du code impossible');
      }
    });
  }

  renvoyerCode(): void {
    if (this.centreSelectionne) {
      this.envoyerCode(this.centreSelectionne);
    }
  }

  confirmerCode(): void {
    if (!this.otpCode || this.otpCode.trim().length < 6) {
      this.toastrService.warning('Saisissez le code à 6 chiffres reçu par email');
      return;
    }

    this.loading = true;
    this.claimService.verifyOtp(this.centreSelectionne.id, this.otpCode.trim()).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.toastrService.success(res.message);
        this.ouvrirDossier(res.data?.requete ?? this.centreSelectionne);
        this.getClaims();
      },
      error: (err: any) => {
        this.loading = false;
        this.toastrService.error(err?.error?.message ?? 'Code incorrect');
      }
    });
  }

  // ── Étape 3 : compléter le dossier ─────────────────────────────────────────

  ouvrirDossier(requete: any): void {
    this.dossier = requete;
    this.aggreementReference = requete?.aggreement_reference ?? '';
    this.aggreementYear = requete?.aggreement_year ?? null;
    this.fileAggreement = null;
    this.etape = 'dossier';
    this.chargerPieces();
  }

  chargerPieces(): void {
    this.loading = true;
    this.claimService.requiredFiles(this.dossier.id).subscribe({
      next: (res: any) => {
        this.requiredFiles = res.data ?? [];
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        this.toastrService.error(err?.error?.message ?? 'Chargement des pièces impossible');
      }
    });
  }

  uploadPiece(event: any, piece: any): void {
    const file = event.target.files[0];
    if (!file) { return; }

    const formData = new FormData();
    formData.append('requete_id', this.dossier.id);
    formData.append('file_id', piece.file_id);
    formData.append('reference', piece.name);
    formData.append('file', file);

    piece.uploading = true;
    this.claimService.addFile(formData).subscribe({
      next: () => {
        piece.uploading = false;
        this.toastrService.success(`${piece.name} enregistrée`);
        this.chargerPieces();
      },
      error: (err: any) => {
        piece.uploading = false;
        this.toastrService.error(err?.error?.message ?? 'Dépôt impossible');
      }
    });
  }

  uploadAgrement(event: any): void {
    this.fileAggreement = event.target.files[0];
  }

  get piecesManquantes(): any[] {
    return this.requiredFiles.filter(f => f.is_required && !f.is_setted);
  }

  get peutTransmettre(): boolean {
    return this.piecesManquantes.length === 0
      && !!this.aggreementReference?.trim()
      && (!!this.fileAggreement || !!this.dossier?.file_aggreement);
  }

  transmettre(): void {
    if (!this.peutTransmettre) {
      this.toastrService.warning('Complétez la référence, le scan de l\'agrément et toutes les pièces obligatoires');
      return;
    }

    const formData = new FormData();
    formData.append('requete_id', this.dossier.id);
    formData.append('aggreement_reference', this.aggreementReference.trim());
    if (this.aggreementYear) { formData.append('aggreement_year', this.aggreementYear); }
    if (this.fileAggreement) { formData.append('file_aggreement', this.fileAggreement); }

    this.isSubmitting = true;
    this.claimService.submit(formData).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.toastrService.success(res.message);
        this.reinitialiser();
        this.getClaims();
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.toastrService.error(err?.error?.message ?? 'Transmission impossible');
      }
    });
  }

  // ── Mes demandes ───────────────────────────────────────────────────────────

  getClaims(): void {
    this.claimService.mine().subscribe({
      next: (res: any) => { this.claims = res.data ?? []; },
      error: () => { }
    });
  }

  /**
   * Reprend une demande déjà confirmée mais restée incomplète : le promoteur
   * n'a pas à repasser par le code, son rattachement est acquis.
   */
  reprendre(claim: any): void {
    this.ouvrirDossier(claim.requete);
  }

  reinitialiser(): void {
    this.etape = 'recherche';
    this.centreSelectionne = null;
    this.dossier = null;
    this.otpCode = '';
    this.centres = [];
    this.centreCherche = false;
    this.searchTerm = '';
    this.requiredFiles = [];
  }

  // ── Libellés ───────────────────────────────────────────────────────────────

  getClaimStatus(status: any): string {
    const labels: Record<number, string> = {
      0: 'Code de confirmation en attente',
      1: 'Dossier à compléter',
      2: 'En attente de validation DFEA',
      3: 'Agrément reconnu',
      4: 'Agrément non reconnu',
    };
    return labels[status] ?? 'Non défini';
  }

  getClaimColor(status: any): string {
    switch (status) {
      case 0: return 'tw-bg-gray-100 tw-text-gray-700';
      case 1: return 'tw-bg-amber-100 tw-text-amber-700';
      case 2: return 'tw-bg-blue-100 tw-text-blue-700';
      case 3: return 'tw-bg-green-100 tw-text-green-700';
      case 4: return 'tw-bg-red-100 tw-text-red-700';
      default: return 'tw-bg-gray-100 tw-text-gray-600';
    }
  }

  toFileUrl(code: any, filename: any): string {
    return ConfigService.toFile(`docs/${code}/${filename}`);
  }
}
