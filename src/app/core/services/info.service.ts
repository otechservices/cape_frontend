import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  url=ConfigService.toApiUrl("infos/");

  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<any[]>(`${this.url}`);
  }



  store(ressource:any){
    return this.http.post<any>(`${ConfigService.toApiUrl("infos-store-2")}`, ressource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }


    setStatus(id:any,status:any){
    return this.http.get<any>(`${this.url}set-status/${id}/${status}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  
}
