import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { JWTTokenService } from "./jwt-token-service";


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor( 
    private authService: AuthService,
    private jwtService:  JWTTokenService 
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      
    const token = this.authService.getJWTToken();
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`
      }
    });
    return next.handle(req);
  }
}