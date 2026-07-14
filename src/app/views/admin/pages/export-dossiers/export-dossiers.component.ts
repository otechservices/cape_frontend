import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/core/services/department.service';
import { DistrictService } from 'src/app/core/services/district.service';
import { MunicipalityService } from 'src/app/core/services/municipality.service';
import { RequeteService } from 'src/app/core/services/requete.service';

/**
 * Écran de recherche et d'export des dossiers CAPE / Garderies.
 * L'utilisateur métier compose ses critères, vérifie le résultat à l'écran,
 * puis exporte exactement cette liste.
 */
@Component({
  selector: 'app-export-dossiers',
  templateUrl: './export-dossiers.component.html',
})
export class ExportDossiersComponent implements OnInit {

  filters: any = {
    agrement: 'non_agree',
    service_id: '',
    department_id: '',
    status: '',
    enquete: '',
    search: '',
    date_from: '',
    date_to: '',
  };

  data: any[] = [];
  departments: any[] = [];
  currentPage = 1;
  pageSize = 10;
  loading = false;
  exporting = false;
  hasSearched = false;

  /** Étapes du circuit de traitement (voir le backend Requete::STATUS_*). */
  readonly statuses = [
    { value: 0, label: 'Nouveau dossier' },
    { value: 1, label: 'Mise en attente' },
    { value: 2, label: 'Rejeté' },
    { value: 3, label: 'Dossier corrigé' },
    { value: 4, label: 'Invitation envoyée' },
    { value: 5, label: 'Transmis au DD' },
    { value: 6, label: 'Attente approbation DDASM' },
    { value: 7, label: 'Attente inscription session' },
    { value: 8, label: 'Agréé' },
    { value: 9, label: 'Agréé (avant plateforme)' },
  ];

  // Transfert d'un dossier vers un autre arrondissement
  selected_data: any;
  municipalities: any[] = [];
  districts: any[] = [];
  transfer: any = { department_id: '', municipality_id: '', district_id: '', motif: '' };
  transferring = false;

  constructor(
    private reqService: RequeteService,
    private departmentService: DepartmentService,
    private municipalityService: MunicipalityService,
    private districtService: DistrictService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.departmentService.getAll().subscribe((res: any) => this.departments = res.data);
    this.municipalityService.getAll().subscribe((res: any) => this.municipalities = res.data);
    this.districtService.getAll().subscribe((res: any) => this.districts = res.data);
    this.search();
  }

  /** Communes du département choisi. */
  get transferMunicipalities(): any[] {
    if (!this.transfer.department_id) return [];
    return this.municipalities.filter(m => m.department_id == this.transfer.department_id);
  }

  /** Arrondissements de la commune choisie. */
  get transferDistricts(): any[] {
    if (!this.transfer.municipality_id) return [];
    return this.districts.filter(d => d.municipality_id == this.transfer.municipality_id);
  }

  openTransfer(content: any, d: any): void {
    this.selected_data = d;
    this.transfer = {
      department_id: d?.district?.municipality?.department_id ?? '',
      municipality_id: d?.district?.municipality_id ?? '',
      district_id: d?.district_id ?? '',
      motif: '',
    };
    this.modalService.open(content, { size: 'lg' });
  }

  submitTransfer(): void {
    if (!this.transfer.district_id) {
      this.toastrService.warning('Sélectionnez un arrondissement');
      return;
    }

    this.transferring = true;
    this.reqService.transferDistrict(this.selected_data.id, this.transfer.district_id, this.transfer.motif)
      .subscribe({
        next: (res: any) => {
          this.toastrService.success(res.message);
          this.transferring = false;
          this.modalService.dismissAll();
          this.search();
        },
        error: (err: any) => {
          this.toastrService.error(err?.error?.message ?? 'Le transfert a échoué');
          this.transferring = false;
        }
      });
  }

  search(): void {
    this.loading = true;
    this.currentPage = 1;
    this.reqService.searchRequetes(this.filters).subscribe({
      next: (res: any) => {
        this.data = res.data ?? [];
        this.loading = false;
        this.hasSearched = true;
      },
      error: () => {
        this.toastrService.error('La recherche a échoué');
        this.loading = false;
      }
    });
  }

  reset(): void {
    this.filters = {
      agrement: '', service_id: '', department_id: '',
      status: '', enquete: '', search: '', date_from: '', date_to: '',
    };
    this.search();
  }

  export(): void {
    if (this.data.length === 0) {
      this.toastrService.warning('Aucun dossier à exporter');
      return;
    }

    this.exporting = true;
    this.reqService.exportRequetes(this.filters).subscribe({
      next: (blob: Blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `dossiers_cape_${new Date().toISOString().slice(0, 10)}.xlsx`;
        link.click();
        URL.revokeObjectURL(link.href);
        this.exporting = false;
      },
      error: () => {
        this.toastrService.error("L'export a échoué");
        this.exporting = false;
      }
    });
  }

  statusLabel(status: number): string {
    return this.statuses.find(s => s.value === status)?.label ?? 'Non défini';
  }

  isAgree(d: any): boolean {
    return d?.status === 8 || d?.status === 9 || d?.has_agreemant === 1 || d?.is_authorized === 1;
  }
}
