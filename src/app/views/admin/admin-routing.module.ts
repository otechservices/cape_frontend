import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { IsAuthedGuard } from 'src/app/core/guards/is-authed.guard';
import { IsVerifiedAccountStateGuard } from 'src/app/core/guards/is-verified-account-state.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LayoutComponent } from './layout/layout.component';
import { ActivityReportComponent } from './pages/activity-report/activity-report.component';
import { AccountActivationComponent } from './pages/auth/account-activation/account-activation.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { PermissionComponent } from './pages/auth/permission/permission.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { RecoveryPasswordComponent } from './pages/auth/recovery-password/recovery-password.component';
import { RoleComponent } from './pages/auth/role/role.component';
import { UserProfilComponent } from './pages/auth/user-profil/user-profil.component';
import { BackupsComponent } from './pages/backups/backups.component';
import { CapeComponent } from './pages/cape/cape.component';
import { ControlComponent } from './pages/control/control.component';
import { CpsComponent } from './pages/cps/cps.component';
import { DepartmentComponent } from './pages/department/department.component';
import { DistrictComponent } from './pages/district/district.component';
import { EspaceEserviceEditComponent } from './pages/espace-eservice/espace-eservice-edit/espace-eservice-edit.component';
import { EspaceEserviceShowComponent } from './pages/espace-eservice/espace-eservice-show/espace-eservice-show.component';
import { EspaceEserviceComponent } from './pages/espace-eservice/espace-eservice.component';
import { EvaluatorComponent } from './pages/evaluator/evaluator.component';
import { FileComponent } from './pages/file/file.component';
import { FollowCapeShowComponent } from './pages/follow-cape/follow-cape-show/follow-cape-show.component';
import { FollowCapeComponent } from './pages/follow-cape/follow-cape.component';
import { HomeComponent } from './pages/home/home.component';
import { JournalComponent } from './pages/journal/journal.component';
import { MemberComponent } from './pages/member/member.component';
import { MessageComponent } from './pages/message/message.component';
import { MunicipalityComponent } from './pages/municipality/municipality.component';
import { ReferalComponent } from './pages/referal/referal.component';
import { RequestHasAgreementComponent } from './pages/request-has-agreement/request-has-agreement.component';
import { RequetesComponent } from './pages/requetes/requetes.component';
import { ResidentComponent } from './pages/resident/resident.component';
import { SanctionComponent } from './pages/sanction/sanction.component';
import { SearchComponent } from './pages/search/search.component';
import { SessionRequestShowComponent } from './pages/session-request-show/session-request-show.component';
import { SessionRequestComponent } from './pages/session-request/session-request.component';
import { SessionComponent } from './pages/session/session.component';
import { StaffComponent } from './pages/staff/staff.component';
import { StatistiqueComponent } from './pages/statistique/statistique.component';
import { TargetsComponent } from './pages/targets/targets.component';
import { TypeAvisComponent } from './pages/type-avis/type-avis.component';
import { TypeCapeComponent } from './pages/type-cape/type-cape.component';
import { TypeControlComponent } from './pages/type-control/type-control.component';
import { TypeFileComponent } from './pages/type-file/type-file.component';
import { TypeSanctionComponent } from './pages/type-sanction/type-sanction.component';
import { UniteAdminComponent } from './pages/unite-admin/unite-admin.component';
import { UserComponent } from './pages/user/user.component';
import { ValidationAggrementComponent } from './pages/validation-aggrement/validation-aggrement.component';
import { NaturePromotorComponent } from './pages/nature-promotor/nature-promotor.component';
import { TypeInfoComponent } from './pages/type-info/type-info.component';
import { InfoComponent } from './pages/info/info.component';
import { BillingComponent } from './pages/billing/billing.component';
import { TypeBillingComponent } from './pages/type-billing/type-billing.component';
import { ServiceComponent } from './pages/service/service.component';
import { ActualityComponent } from './pages/actuality/actuality.component';
import { TypeGarderieComponent } from './pages/type-garderie/type-garderie.component';
import { TypeSousGarderieComponent } from './pages/type-sous-garderie/type-sous-garderie.component';
import { ControlFileElementComponent } from './pages/control-file-element/control-file-element.component';



const routes: Routes = [
  {path: '', redirectTo: '/login',pathMatch:'full'},
  {
    path: '',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:"dashboard",
        component:HomeComponent
      },
      {
        path:"cfes",
        component:ControlFileElementComponent
      },
      {
        path:"departments",
        component:DepartmentComponent
      },
      {
        path:"municipalities",
        component:MunicipalityComponent
      },
      {
        path:"districts",
        component:DistrictComponent
      },
      {
        path:"cps",
        component:CpsComponent
      },
      {
        path:"nature-promotors",
        component:NaturePromotorComponent
      },
      {
        path:"actualities",
        component:ActualityComponent
      },
      {
        path:"targets",
        component:TargetsComponent
      },
      {
        path:"type-capes",
        component:TypeCapeComponent
      },
      {
        path:"type-garderies",
        component:TypeGarderieComponent
      },
      {
        path:"type-sous-garderies",
        component:TypeSousGarderieComponent
      },
      {
        path:"type-billings",
        component:TypeBillingComponent
      },
      {
        path:"type-infos",
        component:TypeInfoComponent
      },
      {
        path:"infos",
        component:InfoComponent
      },
      {
        path:"services",
        component:ServiceComponent
      },
      {
        path:"requetes",
        component:EspaceEserviceComponent
      },
      {
        path:"requetes/:service",
        component:EspaceEserviceComponent
      },
      {
        path:"requetes/:state",
        component:EspaceEserviceComponent
      },
      {
        path:"requetes/:state/:service",
        component:EspaceEserviceComponent
      },
      {
        path:"requetes/show/:code/:service",
        component:EspaceEserviceShowComponent
      },
      {
        path:"requetes/edit/:code",
        component:EspaceEserviceEditComponent
      },
      {
        path:"requetes/edit/:code/:service",
        component:EspaceEserviceEditComponent
      },
      {
        path:"sessions",
        component:SessionComponent
      },
      {
        path:"members",
        component:MemberComponent
      },
      {
        path:"billings",
        component:BillingComponent
      },
      {
        path:"files",
        component:FileComponent
      },

      {
        path:"roles",
        component:RoleComponent
      },
      {
        path:"permissions",
        component:PermissionComponent
      },
      {
        path:"profiles",
        component:ProfileComponent
      },
      {
        path:"type-avis",
        component:TypeAvisComponent
      },
      {
        path:"type-sanctions",
        component:TypeSanctionComponent
      },
      {
        path:"type-controls",
        component:TypeControlComponent
      },
      {
        path:"type-files",
        component:TypeFileComponent
      },
      {
        path:"backups",
        component:BackupsComponent
      },
      {
        path:"journals",
        component:JournalComponent
      },
      {
        path:"users",
        component:UserComponent
      },
      {
        path:"residents",
        component:ResidentComponent
      },
      {
        path:"capes",
        component:CapeComponent
      },
      {
        path:"user-account",
        component:UserProfilComponent
      },
      {
        path:"list-requetes",
        component:RequetesComponent
      },
      {
        path:"statistiques/:type",
        component:StatistiqueComponent
      },
      {
        path:"statistiques/:type/:service",
        component:StatistiqueComponent
      },
      {
        path:"search/:type",
        component:SearchComponent
      },
      {
        path:"search/:type/:service",
        component:SearchComponent
      },
      {
        path:"sanctions",
        component:SanctionComponent
      },
      {
        path:"requetes-aggrement-validation",
        component:ValidationAggrementComponent
      },
      {
        path:"controls",
        component:ControlComponent
      },
      {
        path:"unite-admins",
        component:UniteAdminComponent
      },
      {
        path:"activity-report",
        component:ActivityReportComponent
      },
      {
        path:"activity-report/:service",
        component:ActivityReportComponent
      },
      {
        path:"follow-cape",
        component:FollowCapeComponent
      },
      {
        path:"follow-cape/:service",
        component:FollowCapeComponent
      },
      {
        path:"follow-cape-show/:id",
        component:FollowCapeShowComponent
      },
      {
        path:"messages",
        component:MessageComponent
      },
      {
        path:"referals",
        component:ReferalComponent
      },
      {
        path:"referals/:service",
        component:ReferalComponent
      },
      {
        path:"staff",
        component:StaffComponent
      },
      {
        path:"request-has-agreements",
        component:RequestHasAgreementComponent
      },
      {
        path:"session-requests",
        component:SessionRequestComponent
      },
      {
        path:"session-request-show/:code",
        component:SessionRequestShowComponent
      }
    ]
  },
{
  path:"auth",
  component: AuthLayoutComponent,
  children:[
    {
      path:"activate-account",
      component:AccountActivationComponent,
      canActivate:[IsVerifiedAccountStateGuard]
    },
    {
      path:"login",
      component:LoginComponent,
      canActivate:[IsAuthedGuard]
    },
    {
      path:"forget-password",
      component:ForgetPasswordComponent
    },
    {
      path:"recovery-password/:token",
      component:RecoveryPasswordComponent
    },
  ]
}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
