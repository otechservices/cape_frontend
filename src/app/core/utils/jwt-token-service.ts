import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { LocalStorageService } from './local-stoarge-service';
import { GlobalName } from './global-name';

@Injectable({
    providedIn: 'root'
})
export class JWTTokenService {

    jwtToken: string | undefined;
    decodedToken: { [key: string]: string; } | undefined;

    constructor(
      private lsService:LocalStorageService
    ) {
    }

    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }

    decodeToken(token: string) {
      if (token) {
      this.decodedToken = jwt_decode(token);
      }
      return this.decodedToken
    }

    getDecodeToken() {
      return jwt_decode(this.jwtToken??'');
    }

    getUser(token:any) {
      this.decodeToken(token);
      return this.decodedToken ? this.decodedToken['displayname'] : null;
    }

    getEmailId(token:any) {
      this.decodeToken(token);
      return this.decodedToken ? this.decodedToken['email'] : null;
    }

    getExpiryTime(token:any) {
     let decodedToken= this.decodeToken(token);
      return decodedToken ? decodedToken['exp'] : '0';
    }

    isTokenExpired(token:any): boolean {
      let d1=formatDate(new Date(this.lsService.get(GlobalName.expireIn)),'yyyy-MM-dd hh:mm:ss','en_US') 
      let d2=formatDate(new Date(),'yyyy-MM-dd hh:mm:ss','en_US');
      console.log(d1,d2)
      return d1<d2 ? true:false;
    }
}