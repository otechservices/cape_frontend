import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoterLayoutComponent } from './promoter-layout/promoter-layout.component';
import { PromoterHeaderComponent } from './promoter-layout/includes/promoter-header/promoter-header.component';
import { PromoterSideBarComponent } from './promoter-layout/includes/promoter-side-bar/promoter-side-bar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PromoterRoutingModule } from './promoter-routing.module';
import { PromoterProfilComponent } from './pages/promoter-profil/promoter-profil.component';
import { PromoterSettingComponent } from './pages/promoter-setting/promoter-setting.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscriptionCapeComponent } from './pages/inscription-cape/inscription-cape.component';
import { InscriptionGarderieComponent } from './pages/inscription-garderie/inscription-garderie.component';
import { AssistanceEnligneComponent } from './pages/assistance-enligne/assistance-enligne.component';
import { MesDossiersComponent } from './pages/mes-dossiers/mes-dossiers.component';
import { MonProfilPromoterComponent } from './pages/mon-profil-promoter/mon-profil-promoter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StaffComponent } from './pages/staff/staff.component';
import { ResidentComponent } from './pages/resident/resident.component';
import { ReferalComponent } from './pages/referal/referal.component';
import { ActivityReportComponent } from './pages/activity-report/activity-report.component';
import { RegularisationAgrementComponent } from './pages/regularisation-agrement/regularisation-agrement.component';



@NgModule({
  declarations: [
    PromoterLayoutComponent,
    PromoterHeaderComponent,
    PromoterSideBarComponent,
    PromoterProfilComponent,
    PromoterSettingComponent,
    DashboardComponent,
    InscriptionCapeComponent,
    InscriptionGarderieComponent,
    AssistanceEnligneComponent,
    StaffComponent,
    ResidentComponent,
    ReferalComponent,
    ActivityReportComponent,
    MesDossiersComponent,
    RegularisationAgrementComponent,
    MonProfilPromoterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PromoterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgbModule
  ]
})
export class PromoterModule { }
