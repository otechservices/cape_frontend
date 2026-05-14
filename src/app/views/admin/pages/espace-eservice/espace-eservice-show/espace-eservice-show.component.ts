import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RequeteService } from 'src/app/core/services/requete.service';
import { ResponseService } from 'src/app/core/services/response.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-espace-eservice-show',
  templateUrl: './espace-eservice-show.component.html',
  styleUrls: ['./espace-eservice-show.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EspaceEserviceShowComponent implements OnInit {
  @ViewChild('previewContent') previewContent: any;
  url: SafeResourceUrl | undefined;
  showPreview = false;
  fileSelected: any;
  data: any;
  code: any;
  fileInput: any;
  fileInput2: any;
  is_signed = false;
  loading = false;
  user: any;
  role: any;
  isValid = true;
  pendingObservation: string = '';

  constructor(
    private reqService: RequeteService,
    private toastrService: ToastrService,
    config: NgbModalConfig,
    private lsService: LocalStorageService,
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private activatedRoute: ActivatedRoute,
    private _sanitizationService: DomSanitizer,
    private responseService: ResponseService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.role = this.user.roles[0].name;
    this.code = this.activatedRoute.snapshot.paramMap.get('code');
    this.init();
  }

  init() {
    this.spinner.show();
    this.reqService.get(this.code).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.data = res;
        if (this.data.status == 4 && !this.data.has_cps_file) {
          this.data.social_investigator_name = this.user.cps?.name_chief;
        }
      },
      error: () => {
        this.spinner.hide();
      }
    });
  }

  getJson(value: any) {
    if (value == undefined) return [];
    try { return JSON.parse(value); } catch { return []; }
  }

  getZoneFile(name: any) {
    return ConfigService.toFile('docs/' + this.data.code + '/' + name);
  }

  showFile(filename: any, f?: any) {
    this.fileSelected = f;
    const url = ConfigService.toFile('docs/' + this.data.code + '/' + filename);
    this.url = this._sanitizationService.bypassSecurityTrustResourceUrl(url);
    this.offcanvasService.open(this.previewContent, { panelClass: 'details-panel', position: 'start' });
  }

  showFile2(filename: any) {
    const url = ConfigService.toFile('docs/' + this.data.code + '/' + filename);
    this.url = this._sanitizationService.bypassSecurityTrustResourceUrl(url);
    this.offcanvasService.open(this.previewContent, { panelClass: 'details-panel', position: 'start' });
  }

  showFileCpsFile() {
    const filename = this.data.files2.find((el: any) => el.reference == 'Enquête sociale')?.filename;
    const url = ConfigService.toFile('docs/' + this.data.code + '/' + filename);
    this.url = this._sanitizationService.bypassSecurityTrustResourceUrl(url);
    this.offcanvasService.open(this.previewContent, { panelClass: 'details-panel', position: 'start' });
  }

  showFileRecepisseFile() {
    let filename = '';
    if (this.data.has_deposit_file) {
      filename = this.data.files2.find((el: any) => el.reference == 'Récépissé du dépôt de physique')?.filename;
    } else {
      filename = this.data.receipt_preview;
    }
    const url = ConfigService.toFile('docs/' + this.data.code + '/' + filename);
    this.url = this._sanitizationService.bypassSecurityTrustResourceUrl(url);
    this.offcanvasService.open(this.previewContent, { panelClass: 'details-panel', position: 'start' });
  }

  back() {
    this.offcanvasService.dismiss();
  }

  add(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  upload(event: any) {
    if (event.target.files.length > 0) {
      this.fileInput = event.target.files[0];
    }
  }

  upload2(event: any) {
    if (event.target.files.length > 0) {
      this.fileInput2 = event.target.files[0];
    }
  }

  finishStore1(value: any) {
    const formData = new FormData();
    if (this.fileInput == undefined && !this.data.has_cps_file) {
      AppSweetAlert.simpleAlert('warning', 'Enquête sociale', "Veuillez charger le fichier de l'enquête");
      return;
    }
    if (this.fileInput != undefined) formData.append('file', this.fileInput);
    formData.append('code', this.data.code);
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) formData.append(key, value[key]);
    }
    this.loading = true;
    this.reqService.finishStore1(formData).subscribe({
      next: (res: any) => {
        AppSweetAlert.simpleAlert('success', 'Enquête sociale', res?.message);
        this.data = res;
        this.modalService.dismissAll();
        this.init();
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        AppSweetAlert.simpleAlert('error', 'Enquête sociale', err.error.message);
      }
    });
  }

  finishStore2(value: any) {
    const formData = new FormData();
    if (this.fileInput2 == undefined && this.is_signed) {
      AppSweetAlert.simpleAlert('warning', 'Dépôt physique', 'Veuillez charger le récipissé signé');
      return;
    }
    if (this.fileInput2 != undefined) formData.append('file', this.fileInput2);
    formData.append('code', this.data.code);
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) formData.append(key, value[key]);
    }
    this.loading = true;
    this.reqService.finishStore2(formData).subscribe({
      next: (res: any) => {
        AppSweetAlert.simpleAlert('success', 'Dépôt physique', res?.message);
        if (res.data != null || res.data != undefined) this.showFile(res.data.file);
        this.data = res;
        this.modalService.dismissAll();
        this.init();
        this.loading = false;
      },
      error: (err: any) => {
        AppSweetAlert.simpleAlert('error', 'Dépôt physique', err.error.message);
        this.loading = false;
      }
    });
  }

  inviteStore(value: any) {
    const d2 = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    const d1 = formatDate(value.date_meeting, 'yyyy-MM-dd', 'en_US');
    const dayOfWeek1 = new Date(value.date_meeting).getDay();
    if (d1 < d2) {
      this.toastrService.error('La date fin ne peut être antérieur à la date du jour');
      return;
    }
    if (dayOfWeek1 === 6 || dayOfWeek1 === 0) {
      this.toastrService.error('Veuillez choisir une date de jour ouvré');
      return;
    }
    value.id = this.data.id;
    this.loading = true;
    this.toastrService.info('Envoi du mail en cours', 'Invitation');
    this.reqService.inviteStore(value).subscribe({
      next: (res: any) => {
        this.data = res;
        this.modalService.dismissAll();
        AppSweetAlert.simpleAlert('success', 'Invitation', 'Mail envoyé');
        if (this.data.type_cape?.name?.toLowerCase() == 'cape') {
          this.router.navigate(['/admin/requetes/new/cape']);
        } else {
          this.router.navigate(['/admin/requetes/new/garderie']);
        }
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        this.modalService.dismissAll();
        AppSweetAlert.simpleAlert('error', 'Invitation', err.error.message);
      }
    });
  }

  transUp(value: any) {
    this.loading = true;
    this.reqService.transUp({ code: this.data.code, observation: value.observation }).subscribe({
      next: (res: any) => {
        AppSweetAlert.simpleAlert('success', this.data.status == 6 ? 'Validation de dossier' : 'Transmission', res?.message);
        this.data = res;
        if (this.data.type_cape?.name?.toLowerCase() == 'cape') {
          this.router.navigate(['/admin/requetes/new/cape']);
        } else {
          this.router.navigate(['/admin/requetes/new/garderie']);
        }
        this.loading = false;
        this.modalService.dismissAll();
      },
      error: (err: any) => {
        AppSweetAlert.simpleAlert('error', 'Transmission', err.error.message);
        this.loading = false;
      }
    });
  }

  transDown(value: any) {
    this.loading = true;
    this.reqService.transDown({ code: this.data.code, motif: value.motif }).subscribe({
      next: (res: any) => {
        AppSweetAlert.simpleAlert('success', 'Transmission', res?.message);
        this.loading = false;
        this.data = res;
        this.modalService.dismissAll();
        if (this.data.type_cape?.name?.toLowerCase() == 'cape') {
          this.router.navigate(['/admin/requetes/new/cape']);
        } else {
          this.router.navigate(['/admin/requetes/new/garderie']);
        }
      },
      error: (err: any) => {
        AppSweetAlert.simpleAlert('error', 'Transmission', err.error.message);
        this.loading = false;
      }
    });
  }

  openPendingModal(content: any) {
    const invalidDocs = (this.data.files || []).filter((f: any) => f.is_treated && !f.is_valid);
    const untreatedDocs = (this.data.files || []).filter((f: any) => !f.is_treated);
    let html = '';
    if (invalidDocs.length > 0) {
      html += '<p><strong>Documents non conformes :</strong></p><ul>';
      invalidDocs.forEach((f: any) => {
        html += `<li><strong>${f.file?.name ?? 'Document'}</strong>${f.observation ? ' : ' + f.observation : ''}</li>`;
      });
      html += '</ul>';
    }
    if (untreatedDocs.length > 0) {
      html += '<p><strong>Documents en attente de traitement :</strong></p><ul>';
      untreatedDocs.forEach((f: any) => {
        html += `<li>${f.file?.name ?? 'Document'}</li>`;
      });
      html += '</ul>';
    }
    if (html) html += '<p>Merci de corriger les points mentionnés ci-dessus.</p>';
    this.pendingObservation = html;
    this.modalService.open(content, { size: 'lg' });
  }

  storePending() {
    const value: any = { id: this.data.id, hasPermission: 0, observation: this.pendingObservation };
    this.loading = true;
    this.responseService.needCorrection(value).subscribe({
      next: (res: any) => {
        AppSweetAlert.simpleAlert('success', 'Mise en attente', res?.message);
        if (this.data.type_cape?.name?.toLowerCase() == 'cape') {
          this.router.navigate(['/admin/requetes/new/cape']);
        } else {
          this.router.navigate(['/admin/requetes/new/garderie']);
        }
        this.modalService.dismissAll();
        this.init();
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        AppSweetAlert.simpleAlert('error', 'Mise en attente', err.error.message);
      }
    });
  }

  toggleValid() {
    this.isValid = !this.isValid;
  }

  setFileTreatment(value: any) {
    this.loading = true;
    value.id = this.fileSelected.id;
    value.is_valid = this.isValid;
    this.reqService.setFileTreatment(value).subscribe({
      next: (res: any) => {
        AppSweetAlert.simpleAlert('success', 'Traitement de fichier', res?.message);
        this.loading = false;
        this.fileSelected = null;
        this.modalService.dismissAll();
        this.back();
        this.init();
      },
      error: (err: any) => {
        AppSweetAlert.simpleAlert('error', 'Traitement de fichier', err.error.message);
        this.loading = false;
      }
    });
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
