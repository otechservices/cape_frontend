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
        this.data = res;
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
      6: 'Attente approbation DDASM',
      7: 'Attente inscription session',
    };
    return map[status] ?? 'Non défini';
  }
}
