import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BillingService } from 'src/app/core/services/billing.service';
import { TypeBillingService } from 'src/app/core/services/type-billing.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  buttonsPermission: any | undefined;
  data: any[] = [];
  typeBillings: any[] = [];
  selected_data: any;
  is_active: any = null;
  loading = false;
  loadingResponse = false;
  role: any;
  user: any;

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  responseContent: string = '';

  readonly priorites = ['Urgente', 'Normale', 'Faible'];

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
    private billingService: BillingService,
    private typeBillingService: TypeBillingService,
    private toastrService: ToastrService,
    config: NgbModalConfig,
    private lsService: LocalStorageService,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.role = this.user?.roles?.[0]?.name;
    this.init();
    this.buttonsPermission = { show: true, add: true, delete: true };
  }

  init() {
    this.getAll();
    this.getTypeBillings();
  }

  getAll() {
    this.billingService.getAll().subscribe(
      (res: any) => {
        this.data = res.data;
        this.modalService.dismissAll();
      },
      (err: any) => {}
    );
  }

  getTypeBillings() {
    this.typeBillingService.getAll().subscribe(
      (res: any) => { this.typeBillings = res.data; },
      (err: any) => {}
    );
  }

  store(value: any) {
    this.loading = true;
    value.user_id = this.user.id;
    this.billingService.store(value).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastrService.success(res.message);
        this.getAll();
      },
      (err: any) => {
        this.loading = false;
        AppSweetAlert.simpleAlert('error', 'Ticket', err.error.message);
      }
    );
  }

  storeResponse() {
    if (!this.responseContent || this.responseContent.trim() === '') {
      this.toastrService.warning('La réponse est requise');
      return;
    }
    this.loadingResponse = true;
    this.billingService.storeResponse({
      content: this.responseContent,
      billing_id: this.selected_data.id
    }).subscribe(
      (res: any) => {
        this.loadingResponse = false;
        this.toastrService.success(res.message);
        this.responseContent = '';
        if (!this.selected_data.responses) this.selected_data.responses = [];
        this.selected_data.responses.push(res.data);
      },
      (err: any) => {
        this.loadingResponse = false;
        AppSweetAlert.simpleAlert('error', 'Réponse', err.error.message);
      }
    );
  }

  delete() {
    if (!this.verifyIfElementChecked()) return;
    const confirmed = AppSweetAlert.confirmBox('info', 'Suppression', 'Voulez vous vraiment retirer ce ticket?');
    confirmed.then((result: any) => {
      if (result.isConfirmed) {
        this.billingService.delete(this.selected_data.id).subscribe(
          (res: any) => {
            this.toastrService.success(res.message);
            this.selected_data = null;
            this.is_active = null;
            this.getAll();
          },
          (err: any) => {
            AppSweetAlert.simpleAlert('error', 'Ticket', err.error.message);
          }
        );
      }
    });
  }

  setStatus(value: any) {
    this.toastrService.warning('Opération en cours');
    this.billingService.setStatus(this.selected_data.id, value).subscribe(
      (res: any) => {
        this.toastrService.success(res.message);
        this.getAll();
      },
      (err: any) => {
        AppSweetAlert.simpleAlert('error', 'Ticket', err.error.message);
      }
    );
  }

  checked(el?: any) {
    this.selected_data = el;
    this.is_active = el?.is_active ?? null;
    this.responseContent = '';
  }

  verifyIfElementChecked() {
    if (this.selected_data == null) {
      this.toastrService.warning('Aucun élément selectionné');
      return false;
    }
    return true;
  }

  add(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  show(content: any) {
    if (!this.verifyIfElementChecked()) return;
    this.modalService.open(content, { size: 'lg' });
  }

  getPrioriteClass(priorite: string): string {
    if (priorite === 'Urgente') return 'bg-danger text-white';
    if (priorite === 'Normale') return 'bg-warning text-dark';
    return 'bg-secondary text-white';
  }
}
