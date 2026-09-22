import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RequeteService } from 'src/app/core/services/requete.service';
import { TypeService } from 'src/app/core/services/type.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-espace-eservice',
  templateUrl: './espace-eservice.component.html',
  styleUrls: ['./espace-eservice.component.css']
})
export class EspaceEserviceComponent implements OnInit {

  buttonsPermission: any | undefined;
  data: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  parcours: any[] = [];
  selected_data: any;
  is_active: any = null;
  loading = false;
  service_id: any;
  type: any;
  role: any;
  user: any;
  state: any;
  doublons: any[][] = [];
  doublonIds = new Set<number>();
  seuil: number = 90;
  doublonsLoading = false;
  declaration = { aggreement_reference: '', aggreement_year: '', observation: '' };
  fileDeclaration: File | null = null;
  declaring = false;

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
    private typeService: TypeService,
    private reqService: RequeteService,
    private toastrService: ToastrService,
    config: NgbModalConfig,
    private lsService: LocalStorageService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.role = this.user.roles[0].name;
    this.buttonsPermission = { show: true, add: true, edit: true, delete: true };

    this.activatedRoute.paramMap.subscribe(() => {
      this.selected_data = null;
      this.is_active = null;
      this.data = [];
      this.doublons = [];
      this.doublonIds = new Set<number>();
      this.service_id = undefined;
      this.state = this.activatedRoute.snapshot.paramMap.get('state');
      this.type = this.activatedRoute.snapshot.paramMap.get('service');
      this.setServiceId();
    });
  }

  setServiceId(): void {
    this.typeService.getAll2().subscribe((res: any) => {
      res.data.forEach((element: any) => {
        if (element.name.toLowerCase().includes(this.type?.toLowerCase())) {
          this.service_id = element.id;
        }
      });
      if (this.service_id != undefined) {
        this.getAll();
      } else {
        this.toastrService.info('Impossible de charger les données, service non reconnu', 'Requêtes');
      }
    });
  }

  getAll(): void {
    this.loading = true;
    this.spinner.show();

    const request$ = this.state
      ? this.reqService.getByInstance(this.state, this.service_id)
      : this.reqService.getAll(this.service_id);

    request$.subscribe({
      next: (res: any) => {
        this.loading = false;
        this.spinner.hide();
        // Les deux sources n'ont pas la même forme : get-by-instance/* renvoie un
        // tableau nu, l'index des requêtes une enveloppe {success, message, data}.
        this.data = Array.isArray(res) ? res : (res?.data ?? []);
        this.loadDoublons();
      },
      error: () => {
        this.loading = false;
        this.spinner.hide();
      }
    });
  }

  checked(el: any): void {
    this.selected_data = el;
    this.is_active = el.is_active;
  }

  verifyIfElementChecked(): boolean {
    if (!this.selected_data) {
      this.toastrService.warning('Aucun élément sélectionné');
      return false;
    }
    return true;
  }

  goToShow(): void {
    if (!this.verifyIfElementChecked()) return;
    this.router.navigate(['/admin/requetes/show/' + this.selected_data.code + '/' + this.type]);
  }

  add(content: any): void {
    if (!this.verifyIfElementChecked()) return;
    this.parcours = this.selected_data.parcours ?? [];
    this.modalService.open(content, { size: 'lg' });
  }

  delete(): void {
    if (!this.verifyIfElementChecked()) return;
    AppSweetAlert.confirmBox('info', 'Suppression', 'Voulez-vous vraiment retirer cet enregistrement ?')
      .then((result: any) => {
        if (result.isConfirmed) {
          this.toastrService.warning('Opération en cours');
          this.reqService.delete(this.selected_data.id).subscribe({
            next: (res: any) => {
              this.toastrService.success(res.message);
              this.selected_data = null;
              this.getAll();
            },
            error: (err: any) => {
              AppSweetAlert.simpleAlert('error', 'Requête', err.error?.message);
            }
          });
        }
      });
  }

  dismiss(): void {
    this.modalService.dismissAll();
  }

  /** Doublons et déclaration d'agrément ne concernent que la liste DFEA « à inscrire en session ». */
  get isFinishedDfea(): boolean {
    return this.state === 'finished' && this.role === 'dfea';
  }

  loadDoublons(): void {
    if (!this.isFinishedDfea) return;
    this.doublonsLoading = true;
    this.reqService.getFinishedDuplicates(this.service_id, this.seuil).subscribe({
      next: (res: any) => {
        this.doublonsLoading = false;
        this.doublons = res?.data ?? [];
        this.doublonIds = new Set(this.doublons.flat().map((m: any) => m.id));
      },
      error: () => {
        this.doublonsLoading = false;
      }
    });
  }

  openDoublons(content: any): void {
    this.loadDoublons();
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }

  consulterDoublon(m: any): void {
    this.modalService.dismissAll();
    this.router.navigate(['/admin/requetes/show/' + m.code + '/' + this.type]);
  }

  deleteDoublon(m: any): void {
    AppSweetAlert.confirmBox('warning', 'Suppression du doublon',
      `Supprimer définitivement le dossier « ${m.name} » (${m.code}) ? Ses pièces, réponses et parcours seront effacés.`)
      .then((result: any) => {
        if (!result.isConfirmed) return;
        this.reqService.delete(m.id).subscribe({
          next: (res: any) => {
            this.toastrService.success(res.message);
            if (this.selected_data?.id === m.id) this.selected_data = null;
            // Recharge la liste, et avec elle les groupes de doublons.
            this.getAll();
          },
          error: (err: any) => {
            AppSweetAlert.simpleAlert('error', 'Suppression', err.error?.message);
          }
        });
      });
  }

  openDeclareAgree(content: any): void {
    if (!this.verifyIfElementChecked()) return;
    this.declaration = { aggreement_reference: '', aggreement_year: '', observation: '' };
    this.fileDeclaration = null;
    this.modalService.open(content, { size: 'lg' });
  }

  uploadDeclaration(ev: any): void {
    this.fileDeclaration = ev.target.files?.length ? ev.target.files[0] : null;
  }

  confirmDeclareAgree(modal: any): void {
    const reference = this.declaration.aggreement_reference.trim();
    if (!reference) {
      this.toastrService.warning("Indiquez la référence de l'arrêté d'agrément");
      return;
    }
    if (!this.fileDeclaration) {
      this.toastrService.warning("Joignez l'arrêté d'agrément scanné");
      return;
    }

    const data = new FormData();
    data.append('id', String(this.selected_data.id));
    data.append('aggreement_reference', reference);
    if (this.declaration.aggreement_year) data.append('aggreement_year', this.declaration.aggreement_year);
    if (this.declaration.observation) data.append('observation', this.declaration.observation);
    data.append('file_aggreement', this.fileDeclaration);

    this.declaring = true;
    this.reqService.declareAgree(data).subscribe({
      next: (res: any) => {
        this.declaring = false;
        modal.close();
        // L'agrément est acté même si le promoteur n'a pas pu être prévenu :
        // la DFEA doit alors le savoir pour le contacter autrement.
        res.warning
          ? AppSweetAlert.simpleAlert('warning', res.message, res.warning)
          : AppSweetAlert.simpleAlert('success', 'Déclaration enregistrée', res.message);
        this.selected_data = null;
        this.getAll();
      },
      error: (err: any) => {
        this.declaring = false;
        AppSweetAlert.simpleAlert('error', 'Déclaration impossible', err?.error?.message ?? 'La déclaration a échoué');
      }
    });
  }

  getJson(value: any): any[] {
    if (!value) return [];
    try { return JSON.parse(value); } catch { return []; }
  }

  getStatusClass(status: number): string {
    const map: Record<number, string> = {
      0: 'tw-bg-gray-100 tw-text-gray-700',
      1: 'tw-bg-yellow-100 tw-text-yellow-800',
      2: 'tw-bg-red-100 tw-text-red-700',
      3: 'tw-bg-blue-100 tw-text-blue-700',
      4: 'tw-bg-indigo-100 tw-text-indigo-700',
      5: 'tw-bg-purple-100 tw-text-purple-700',
      6: 'tw-bg-orange-100 tw-text-orange-700',
      7: 'tw-bg-teal-100 tw-text-teal-700',
      8: 'tw-bg-green-100 tw-text-green-800',
      9: 'tw-bg-green-100 tw-text-green-800',
      10: 'tw-bg-cyan-100 tw-text-cyan-700',
    };
    return map[status] ?? 'tw-bg-gray-100 tw-text-gray-600';
  }

  getText(status: number): string {
    const map: Record<number, string> = {
      0: 'Nouveau dossier',
      1: 'Mise en attente',
      2: 'Rejeté',
      3: 'Dossier corrigé',
      4: 'Invitation envoyée',
      5: 'Transmis au DD',
      6: 'Approuvé DDASM, attente DFEA',
      7: 'Attente inscription session',
      8: 'Agréé',
      9: 'Agréé (avant plateforme)',
      10: 'Agrément en validation DFEA',
    };
    return map[status] ?? 'Non défini';
  }

  /** Un dossier est agréé s'il est autorisé via la plateforme (8) ou issu de l'import des agréments existants (9). */
  isAgree(d: any): boolean {
    return d?.status === 8 || d?.status === 9 || d?.has_agreemant === 1 || d?.is_authorized === 1;
  }

  /**
   * Nombre de jours écoulés depuis le dernier mouvement du dossier.
   * À défaut de parcours enregistré, on repart de la date de soumission.
   */
  daysSinceLastStep(d: any): number {
    const last = d?.last_parcours?.created_at ?? d?.created_at;
    if (!last) return 0;
    const elapsed = Date.now() - new Date(last).getTime();
    return Math.max(0, Math.floor(elapsed / 86400000));
  }

  /**
   * Dossier sorti du circuit d'instruction : autorisé via la plateforme (8) ou agréé avant elle (9).
   * Plus aucune action n'y est attendue, l'ancienneté du dernier mouvement n'a donc pas de sens.
   */
  isClos(d: any): boolean {
    return d?.status === 8 || d?.status === 9;
  }

  /** Un dossier encore en instruction est en souffrance au-delà de 15 jours sans mouvement. */
  isEnSouffrance(d: any): boolean {
    return !this.isClos(d) && this.daysSinceLastStep(d) > 15;
  }

  /** Signale visuellement les dossiers qui stagnent : au-delà de 15 jours, le traitement est en souffrance. */
  agingClass(d: any): string {
    const days = this.daysSinceLastStep(d);
    if (days > 15) return 'tw-bg-red-100 tw-text-red-700';
    if (days > 7) return 'tw-bg-amber-100 tw-text-amber-700';
    return 'tw-bg-gray-100 tw-text-gray-600';
  }
}
