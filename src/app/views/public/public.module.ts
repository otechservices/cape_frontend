import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { PublicRoutingModule } from './public-routing.module';
import { MenuComponent } from './layout/includes/menu/menu.component';
import { RequestComponent } from './pages/request/request.component';
import { IgxStepperModule } from 'igniteui-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizerUrlPipe } from 'src/app/core/pipes/sanitizer-url-pipe';
import { NewRequestComponent } from './pages/request/new-request/new-request.component';
import { UpdateRequestComponent } from './pages/request/update-request/update-request.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ListCapeComponent } from './pages/list-cape/list-cape.component';

import { ResultComponent } from './pages/result/result.component';
import { NewRequestGarderieComponent } from './pages/request/new-request-garderie/new-request-garderie.component';
import { UpdateRequestGarderieComponent } from './pages/request/update-request-garderie/update-request-garderie.component';
import { DetailComponent } from './pages/detail/detail.component';
import { InfoComponent } from './pages/info/info.component';
import { SupportComponent } from './pages/support/support.component';
import { BillingComponent } from './pages/billing/billing.component';
import { BillingDetailComponent } from './pages/billing-detail/billing-detail.component';
import { ActualityDetailsComponent } from './pages/actuality-details/actuality-details.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    MenuComponent,
    RequestComponent,
    SanitizerUrlPipe,
    NewRequestComponent,
    UpdateRequestComponent,
    ContactComponent,
    ListCapeComponent,
    ResultComponent,
    NewRequestGarderieComponent,
    UpdateRequestGarderieComponent,
    DetailComponent,
    InfoComponent,
    SupportComponent,
    BillingComponent,
    BillingDetailComponent,
    ActualityDetailsComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    IgxStepperModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PublicModule { }
