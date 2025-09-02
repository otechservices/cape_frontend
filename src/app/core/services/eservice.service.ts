import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class EServiceService {

  url=ConfigService.toApiUrl("eservice/");

  constructor(private http:HttpClient) { }

  store(ressource:any){
    return this.http.post<any>(`${this.url}`, ressource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  addFile(ressource:any){
    return this.http.post<any>(`${ConfigService.toApiUrl("eservice-add-file/")}`, ressource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  purgeFile(ressource:any){
    return this.http.post<any>(`${ConfigService.toApiUrl("eservice-purge-file/")}`, ressource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  
  get(token:any,code:any){

    return this.http.get<any>(`${this.url}${token}/${code}`, ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  
  }

}
