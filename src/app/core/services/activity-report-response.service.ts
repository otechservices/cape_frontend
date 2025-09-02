import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class ActivityReportResponseService {
  url=ConfigService.toApiUrl("activity-report-responses/");

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any[]>(`${this.url}`);
  }
  getForCape(){
    return this.http.get<any[]>(`${this.url}cape/all`);
  }

  store(ressource:any){
    return this.http.post<any>(`${this.url}`, ressource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  update(id:any,ressource:any){
 //   ressource.append('_method','put');

    return this.http.put<any>(`${this.url}${id}/`, ressource,  ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  delete(id:any){
   // ressource['method']='delete';
    return this.http.delete<any>(`${this.url}${id}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  get(id:any){
    return this.http.get<any>(`${this.url}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  setStatus(id:any,status:any){
    return this.http.get<any>(`${this.url}set-status/${id}/${status}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  send(id:any){
    return this.http.get<any>(`${this.url}set-transmission/${id}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
}
