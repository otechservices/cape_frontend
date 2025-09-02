import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ListCapeComponent } from './pages/list-cape/list-cape.component';
import { RequestComponent } from './pages/request/request.component';
import { ResultComponent } from './pages/result/result.component';
import { VerifyDocumentComponent } from './pages/verify-document/verify-document.component';
import { DetailComponent } from './pages/detail/detail.component';
import { InfoComponent } from './pages/info/info.component';
import { SupportComponent } from './pages/support/support.component';
import { BillingComponent } from './pages/billing/billing.component';
import { BillingDetailComponent } from './pages/billing-detail/billing-detail.component';
import { ActualityDetailsComponent } from './pages/actuality-details/actuality-details.component';



const routes: Routes = [
  {path: '', redirectTo: '/accueil',pathMatch:'full'},
  {
    path: '',
    component:LayoutComponent,
    children:[
      {
        path:"accueil",
        component:HomeComponent
      },
      {
        path:"request",
        component:RequestComponent
      },
      {
        path:"request/:type",
        component:RequestComponent
      },
      {
        path:"details/:type",
        component:DetailComponent
      },
      {
        path:"contact",
        component:ContactComponent
      },
      {
        path:"actuality-details/:id",
        component:ActualityDetailsComponent
      },
      {
        path:"billings",
        component:BillingComponent
      },
      {
        path:"billings-details/:token",
        component:BillingDetailComponent
      },
      {
        path:"list-capes/authorized",
        component:ListCapeComponent
      },
      {
        path:"list-capes/authorized/:type",
        component:ListCapeComponent
      },
      {
        path:"requested-infos",
        component:InfoComponent
      },
      {
        path:"requested-support",
        component:SupportComponent
      },
      {
        path:"results",
        component:ResultComponent
      },
      {
        path:"verify-document/:token",
        component:VerifyDocumentComponent
      },
      {
        path:"requete/updating/:token/:code",
        component:RequestComponent
      }
    ]
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
