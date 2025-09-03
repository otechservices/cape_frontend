import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/includes/footer/footer.component';
import { HeaderComponent } from './layout/includes/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MenuComponent } from './layout/includes/menu/menu.component';
import { UserComponent } from './pages/user/user.component';
import { MunicipalityComponent } from './pages/municipality/municipality.component';
import { DepartmentComponent } from './pages/department/department.component';
import { DistrictComponent } from './pages/district/district.component';
import { CpsComponent } from './pages/cps/cps.component';
import { EvaluatorComponent } from './pages/evaluator/evaluator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountActivationComponent } from './pages/auth/account-activation/account-activation.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PermissionComponent } from './pages/auth/permission/permission.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { RecoveryPasswordComponent } from './pages/auth/recovery-password/recovery-password.component';
import { RoleComponent } from './pages/auth/role/role.component';
import { UserProfilComponent } from './pages/auth/user-profil/user-profil.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

import { TargetsComponent } from './pages/targets/targets.component';
import { TypeCapeComponent } from './pages/type-cape/type-cape.component';
import { EspaceEserviceEditComponent } from './pages/espace-eservice/espace-eservice-edit/espace-eservice-edit.component';
import { EspaceEserviceShowComponent } from './pages/espace-eservice/espace-eservice-show/espace-eservice-show.component';
import { EspaceEserviceComponent } from './pages/espace-eservice/espace-eservice.component';
import { MemberComponent } from './pages/member/member.component';
import { SessionComponent } from './pages/session/session.component';
import { AvisComponent } from './pages/avis/avis.component';
import { FileComponent } from './pages/file/file.component';
import { SessionRequestComponent } from './pages/session-request/session-request.component';
import { SessionRequestShowComponent } from './pages/session-request-show/session-request-show.component';
import { RequestHasAgreementComponent } from './pages/request-has-agreement/request-has-agreement.component';
import { ResidentComponent } from './pages/resident/resident.component';
import { ReferalComponent } from './pages/referal/referal.component';
import { StaffComponent } from './pages/staff/staff.component';
import { FollowCapeComponent } from './pages/follow-cape/follow-cape.component';
import { FollowCapeShowComponent } from './pages/follow-cape/follow-cape-show/follow-cape-show.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CapeComponent } from './pages/cape/cape.component';
import { StatistiqueComponent } from './pages/statistique/statistique.component';
import { SanctionComponent } from './pages/sanction/sanction.component';
import { MessageComponent } from './pages/message/message.component';
import { TypeAvisComponent } from './pages/type-avis/type-avis.component';
import { TypeControlComponent } from './pages/type-control/type-control.component';
import { TypeFileComponent } from './pages/type-file/type-file.component';
import { TypeSanctionComponent } from './pages/type-sanction/type-sanction.component';
import { RequetesComponent } from './pages/requetes/requetes.component';
import { BackupsComponent } from './pages/backups/backups.component';
import { JournalComponent } from './pages/journal/journal.component';
import { ActivityReportComponent } from './pages/activity-report/activity-report.component';
import { UniteAdminComponent } from './pages/unite-admin/unite-admin.component';
import { ControlComponent } from './pages/control/control.component';
import { SearchComponent } from './pages/search/search.component';
import { ValidationAggrementComponent } from './pages/validation-aggrement/validation-aggrement.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NaturePromotorComponent } from './pages/nature-promotor/nature-promotor.component';
import { TypeInfoComponent } from './pages/type-info/type-info.component';
import { InfoComponent } from './pages/info/info.component';
import { ServiceComponent } from './pages/service/service.component';
import { BillingComponent } from './pages/billing/billing.component';
import { TypeBillingComponent } from './pages/type-billing/type-billing.component';
import { ActualityComponent } from './pages/actuality/actuality.component';
import { TypeGarderieComponent } from './pages/type-garderie/type-garderie.component';
import { TypeSousGarderieComponent } from './pages/type-sous-garderie/type-sous-garderie.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ControlFileElementComponent } from './pages/control-file-element/control-file-element.component';




@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MenuComponent,
    UserComponent,
    MunicipalityComponent,
    DepartmentComponent,
    DistrictComponent,
    CpsComponent,
    EvaluatorComponent,
    AccountActivationComponent,
    ForgetPasswordComponent,
    LoginComponent,
    PermissionComponent,
    ProfileComponent,
    RecoveryPasswordComponent,
    RoleComponent,
    UserProfilComponent,
    EspaceEserviceComponent,
    EspaceEserviceShowComponent,
    EspaceEserviceEditComponent,
    AuthLayoutComponent,
    TargetsComponent,
    TypeCapeComponent,
    MemberComponent,
    SessionComponent,
    AvisComponent,
    FileComponent,
    SessionRequestComponent,
    SessionRequestShowComponent,
    RequestHasAgreementComponent,
    ResidentComponent,
    ReferalComponent,
    StaffComponent,
    FollowCapeComponent,
    FollowCapeShowComponent,
    CapeComponent,
    StatistiqueComponent,
    SanctionComponent,
    MessageComponent,
    TypeAvisComponent,
    TypeControlComponent,
    TypeFileComponent,
    TypeSanctionComponent,
    RequetesComponent,
    BackupsComponent,
    JournalComponent,
    ActivityReportComponent,
    UniteAdminComponent,
    ControlComponent,
    SearchComponent,
    ValidationAggrementComponent,
    NaturePromotorComponent,
    TypeInfoComponent,
    InfoComponent,
    ServiceComponent,
    BillingComponent,
    TypeBillingComponent,
    ActualityComponent,
    TypeGarderieComponent,
    TypeSousGarderieComponent,
    ControlFileElementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    NgIdleKeepaliveModule.forRoot(),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
