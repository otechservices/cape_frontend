import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-stoarge-service';
import { GlobalName } from './global-name';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from './config-service';
import { SessionService } from '../services/session.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private lsService: LocalStorageService,
    private sessionService: SessionService,
    private modalService: NgbModal
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    var token: any = this.lsService.get(GlobalName.tokenName);

    // console.log(req.url)
    // if (req.url && req.url.includes(ConfigService.toApiUrl('public/auth/login'))) {
    //   token = this.lsService.get(GlobalName.customerTokenName);
    // } else {
    //   token = this.lsService.get(GlobalName.tokenName);
    // }
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`,
      },
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (
            typeof ErrorEvent !== 'undefined' &&
            error.error instanceof ErrorEvent
          ) {
            console.log('Error Event');
          } else {
            console.log(`error status : ${error.status}`);
            switch (error.status) {
              case 401:
                // Session expirée côté serveur : on ferme tout et on renvoie
                // à la connexion, sans laisser de fenêtre ouverte par-dessus.
                this.sessionService.terminer();
                break;
              case 403:
                break;
              case 0:
              case 400:
              case 405:
              case 406:
              case 409:
              case 500:
                break;
            }
          }
        } else {
          console.error("Une erreur non identifiée s'est produit.");
        }

        return throwError(error);
      })
    );
  }
}
