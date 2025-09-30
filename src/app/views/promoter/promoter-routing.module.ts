import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoterLayoutComponent } from './promoter-layout/promoter-layout.component';
import { PromoterHeaderComponent } from './promoter-layout/includes/promoter-header/promoter-header.component';
import { PromoterSideBarComponent } from './promoter-layout/includes/promoter-side-bar/promoter-side-bar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InscriptionCapeComponent } from './pages/inscription-cape/inscription-cape.component';
import { InscriptionGarderieComponent } from './pages/inscription-garderie/inscription-garderie.component';
import { MesDossiersComponent } from './pages/mes-dossiers/mes-dossiers.component';
import { AssistanceEnligneComponent } from './pages/assistance-enligne/assistance-enligne.component';
import { MonProfilPromoterComponent } from './pages/mon-profil-promoter/mon-profil-promoter.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';



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
        path:"assistance-en-ligne",
        component:AssistanceEnligneComponent
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
