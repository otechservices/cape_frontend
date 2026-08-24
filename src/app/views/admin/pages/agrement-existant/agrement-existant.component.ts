import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AgrementClaimService } from 'src/app/core/services/agrement-claim.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

/**
 * Validation par la DFEA des agréments délivrés hors plateforme.
 *
 * Une seule file d'attente pour les deux origines : les centres importés que
 * leur promoteur a revendiqués, et les nouveaux dossiers dont le promoteur a
 * déclaré détenir un agrément dès l'inscription. Dans les deux cas la décision
 * prise ici est terminale — elle autorise le centre, ou renvoie le dossier là
 * où il doit reprendre (agréé hors plateforme, ou circuit d'instruction).
 */
@Component({
  selector: 'app-agrement-existant',
  templateUrl: './agrement-existant.component.html',
  styleUrls: ['./agrement-existant.component.css']
})
export class AgrementExistantComponent implements OnInit {

  buttonsPermission: any | undefined;
  data: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  selected_data: any;
  is_active: any = null;
  loading = false;
  role: any;
  user: any;
  observation: string = '';
  url: SafeResourceUrl | undefined;
  showPreview = false;

  get filteredData(): any[] {
    if (!this.searchTerm || this.searchTerm.trim() === '') return this.data;
    const term = this.searchTerm.toLowerCase().trim();
    return this.data.filter(item => this.deepSearch(item, term));
  }

  private deepSearch(obj: any, term: string): boolean {
    if (obj === null || obj === undefined) return false;
    if (typeof obj === 'string') return obj.toLowerCase().includes(term);
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj).toLowerCase().includes(term);
    if (Array.isArray(obj)) return obj.some(item => this.deepSearch(item, term));
    if (typeof obj === 'object') return Object.values(obj).some(val => this.deepSearch(val, term));
    return false;
  }

  constructor(
    private claimService: AgrementClaimService,
    private toastrService: ToastrService,
    config: NgbModalConfig,
    private _sanitizationService: DomSanitizer,
    private lsService: LocalStorageService,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.role = this.user?.roles[0]?.name;
    this.getAll();
    this.buttonsPermission = { show: true, add: false, edit: false, delete: false };
  }

  getAll(): void {
    this.loading = true;
    this.claimService.pending().subscribe({
      next: (res: any) => {
        this.data = res.data ?? [];
        this.selected_data = undefined;
        this.loading = false;
        this.modalService.dismissAll();
      },
      error: (err: any) => {
        this.loading = false;
        this.toastrService.error(err?.error?.message ?? 'Chargement impossible');
      }
    });
  }

  checked(el: any): void {
    this.selected_data = el;
    this.is_active = el.status;
  }

  show(content: any, el: any): void {
    this.selected_data = el;
    this.observation = '';
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }

  /** Reconnaît l'agrément : le centre devient autorisé. */
  valider(): void {
    AppSweetAlert.confirmBox(
      'question',
      "Reconnaître l'agrément",
      `Le centre « ${this.selected_data?.requete?.name} » sera enregistré comme autorisé et recevra ses accès. Confirmez-vous ?`
    ).then((result: any) => {
      if (result.value) { this.decider(true); }
    });
  }

  /**
   * Refuse l'agrément. Le motif est exigé : c'est la seule information que le
   * promoteur recevra pour comprendre la décision.
   */
  rejeter(): void {
    if (!this.observation || this.observation.trim().length < 5) {
      this.toastrService.warning('Précisez le motif du rejet');
      return;
    }

    const suite = this.selected_data?.origin === 'import'
      ? "Le centre restera agréé hors plateforme et la revendication sera écartée."
      : "Le dossier basculera dans le circuit d'instruction complet.";

    AppSweetAlert.confirmBox(
      'warning',
      "Ne pas reconnaître l'agrément",
      `${suite} Confirmez-vous ?`
    ).then((result: any) => {
      if (result.value) { this.decider(false); }
    });
  }

  private decider(decision: boolean): void {
    this.loading = true;
    this.claimService.decide(this.selected_data.id, decision, this.observation).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.toastrService.success(res.message);
        this.getAll();
      },
      error: (err: any) => {
        this.loading = false;
        this.toastrService.error(err?.error?.message ?? 'Décision impossible');
      }
    });
  }

  preview(filename: any, code: any): void {
    this.url = this._sanitizationService.bypassSecurityTrustResourceUrl(
      ConfigService.toFile(`docs/${code}/${filename}`)
    );
    this.showPreview = true;
  }

  closePreview(): void {
    this.showPreview = false;
    this.url = undefined;
  }

  toFileUrl(code: any, filename: any): string {
    return ConfigService.toFile(`docs/${code}/${filename}`);
  }

  getOrigin(origin: any): string {
    return origin === 'import'
      ? 'Centre importé revendiqué'
      : "Agrément déclaré à l'inscription";
  }

  getOriginColor(origin: any): string {
    return origin === 'import'
      ? 'tw-bg-purple-100 tw-text-purple-700'
      : 'tw-bg-blue-100 tw-text-blue-700';
  }
}
