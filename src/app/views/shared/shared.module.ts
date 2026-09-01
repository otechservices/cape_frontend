import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
// import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from 'src/app/views/shared/components/loading/loading.component';
import { PublicFooterComponent } from '../public/layout/includes/public-footer/public-footer.component';
import { PublicHeaderComponent } from '../public/layout/includes/public-header/public-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchFilterPipe } from 'src/app/core/pipes/search-filter.pipe';
import { PaginatePipe } from 'src/app/core/pipes/paginate.pipe';
import { AgrementRequiredComponent } from './components/agrement-required/agrement-required.component';
import { SampleSearchPipe } from 'src/app/core/pipes/sample-search.pipe';


@NgModule({
  declarations: [
     ButtonComponent,
        CardComponent,
        ModalComponent,
        PublicHeaderComponent,
        PublicFooterComponent,
        LoadingComponent,
        PaginationComponent,
        SearchFilterPipe,
        PaginatePipe,
        SampleSearchPipe,
        AgrementRequiredComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ToastModule,
    TabMenuModule,
    TableModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    MessagesModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    QuillModule,
    NgSelectModule,
    ColorPickerModule,
    MultiSelectModule,
    RadioButtonModule,
    TooltipModule,
    AccordionModule,
    InputSwitchModule,
    CheckboxModule,
    ImageModule,
    CalendarModule,
    OverlayPanelModule,
    HttpClientModule,
    
  ],
  exports: [
    AgrementRequiredComponent,
    ButtonComponent,
    CardComponent,
    ModalComponent,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ToastModule,
    TabMenuModule,
    TableModule,
    SelectButtonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    QuillModule,
    NgSelectModule,
    ColorPickerModule,
    MultiSelectModule,
    RadioButtonModule,
    TooltipModule,
    AccordionModule,
    InputSwitchModule,
    CheckboxModule,
    CalendarModule,
        PublicHeaderComponent,
        PublicFooterComponent,
        LoadingComponent,
        PaginationComponent,
        SearchFilterPipe,
        PaginatePipe,
        SampleSearchPipe
  ],
  providers: [
    MessageService,
    ConfirmationService,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
