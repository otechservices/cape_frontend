import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/includes/header/header.component';
import { FooterComponent } from './layout/includes/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PublicRoutingModule } from './public-routing.module';
import { MenuComponent } from './layout/includes/menu/menu.component';
import { RequestComponent } from './pages/request/request.component';
import { IgxStepperModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { SanitizerUrlPipe } from 'src/app/core/pipes/sanitizer-url-pipe';
import { NewRequestComponent } from './pages/request/new-request/new-request.component';
import { NgToggleModule } from 'ng-toggle-button';
import { UpdateRequestComponent } from './pages/request/update-request/update-request.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ListCapeComponent } from './pages/list-cape/list-cape.component';
import { DataTablesModule } from 'angular-datatables';
import { ResultComponent } from './pages/result/result.component';
import { NgSelect2Module } from 'ng-select2';
import { NgYasYearPickerModule } from 'ngy-year-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewRequestGarderieComponent } from './pages/request/new-request-garderie/new-request-garderie.component';
import { UpdateRequestGarderieComponent } from './pages/request/update-request-garderie/update-request-garderie.component';
import { DetailComponent } from './pages/detail/detail.component';
import { InfoComponent } from './pages/info/info.component';
import { SupportComponent } from './pages/support/support.component';
import { BillingComponent } from './pages/billing/billing.component';
import { BillingDetailComponent } from './pages/billing-detail/billing-detail.component';
import { ActualityDetailsComponent } from './pages/actuality-details/actuality-details.component';
import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
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
    AngularMultiSelectModule,
    SharedModule,
    NgToggleModule.forRoot(),
    DataTablesModule,
    NgSelect2Module,
    NgYasYearPickerModule,
    NgbModule,
    GoogleMapsModule
  ]
})
export class PublicModule { }
