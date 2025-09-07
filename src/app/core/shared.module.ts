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


@NgModule({
  declarations: [
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
  ],
  exports: [
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
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
