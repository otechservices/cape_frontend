import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoterLayoutComponent } from './promoter-layout/promoter-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InscriptionCapeComponent } from './pages/inscription-cape/inscription-cape.component';
import { InscriptionGarderieComponent } from './pages/inscription-garderie/inscription-garderie.component';
import { MesDossiersComponent } from './pages/mes-dossiers/mes-dossiers.component';
import { AssistanceEnligneComponent } from './pages/assistance-enligne/assistance-enligne.component';
import { MonProfilPromoterComponent } from './pages/mon-profil-promoter/mon-profil-promoter.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { StaffComponent } from './pages/staff/staff.component';
import { ResidentComponent } from './pages/resident/resident.component';
import { ReferalComponent } from './pages/referal/referal.component';
import { ActivityReportComponent } from './pages/activity-report/activity-report.component';
import { StatistiqueComponent } from '../admin/pages/statistique/statistique.component';
import { ControlComponent } from '../admin/pages/control/control.component';
import { SearchComponent } from '../admin/pages/search/search.component';



const routes: Routes = [
  {path: '', redirectTo: '/dashboard',pathMatch:'full'},
  {
    path: '',
    canActivate:[AuthGuard],
    component:PromoterLayoutComponent,
    children:[
      {
        path:"dashboard",
        component:DashboardComponent
      },
      {
        path:"inscription-cape",
        component:InscriptionCapeComponent
      },
        {
        path:"inscription-garderie",
        component:InscriptionGarderieComponent
      },

        {
        path:"mes-dossiers",
        component:MesDossiersComponent
      },

      {
        path:"staff",
        component:StaffComponent
      },
      {
          path:"residents",
          component:ResidentComponent
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
          path:"activity-report",
          component:ActivityReportComponent
        },

       {
        path:"assistance-en-ligne",
        component:AssistanceEnligneComponent
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
            path:"controls",
            component:ControlComponent
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
        path:"mon-profil-promoteur",
        component:MonProfilPromoterComponent
      }
    ]
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoterRoutingModule { }
