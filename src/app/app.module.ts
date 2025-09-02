import { LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './views/not-found-component/not-found-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './core/guards/auth.guard';
import { AppHttpInterceptor } from './core/utils/app-http-interceptor';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { VerifyDocumentComponent } from './views/public/pages/verify-document/verify-document.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    VerifyDocumentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgIdleKeepaliveModule.forRoot()
    

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
