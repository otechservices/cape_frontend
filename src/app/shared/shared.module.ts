import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SearchPaginatorContainerComponent } from './search-paginator-container/search-paginator-container.component';
import { FormsModule } from '@angular/forms';
import { SampleSearchPipe } from '../core/pipes/sample-search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonActionComponent } from './button-action/button-action.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from '../core/shared/loading/loading.component';



@NgModule({
  declarations: [
    SearchPaginatorContainerComponent,
    SampleSearchPipe,
    ButtonActionComponent,
    InputComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

  ],
  exports:[
    LoadingComponent
  ]
})
export class SharedModule { }
