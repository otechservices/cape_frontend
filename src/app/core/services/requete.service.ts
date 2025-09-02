import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class RequeteService {
  url=ConfigService.toApiUrl("requetes/");

  constructor(private http:HttpClient) { }

  getAll(service?:any){
    return this.http.get<any[]>(`${this.url}?service_id=${service}`);
  }
  getPendingValidation(){
    return this.http.get<any[]>(`${this.url}get-pending-validation/all`);
  }
  getByInstance(state:any,service?:any){
    return this.http.get<any[]>(`${this.url}get-by-instance/${state}?service_id=${service}`);
  }



  update(id:any,ressource:any){
    //ressource['method']='_patch';

    return this.http.put<any>(`${this.url}${id}/`, ressource,  ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  
  get(id:any){
    return this.http.get<any>(`${this.url}${id}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  getForResult(id:any){
    return this.http.get<any>(`${this.url}result-session/${id}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  get2(id:any){
    return this.http.get<any>(`${this.url}for-session/${id}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  getListForPublic(serviceId:any){
    return this.http.get<any>(`${this.url}list-cape/all/${serviceId}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  transUp(ressource:any){
    return this.http.post<any>(`${this.url}trans-up`,ressource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  transDown(resource:any){
    return this.http.post<any>(`${this.url}trans-down`,resource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  inviteStore(ressource:any){
    return this.http.post<any>(`${this.url}invite`,
    ressource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  finishStore1(resource:any){
    return this.http.post<any>(`${this.url}state/finished-store-1`,resource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  finishStore2(resource:any){
    return this.http.post<any>(`${this.url}state/finished-store-2`,resource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }


  finish(resource:any){
    return this.http.post<any>(`${this.url}session/decision`,resource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  getDecisions(){
    return this.http.get<any>(`${this.url}session/decision`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  setDecision(resource:any){
    return this.http.post<any>(`${this.url}set-status`,resource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  authorized(){
    return this.http.get<any>(`${this.url}authorized/set-all`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  setStatus(resource:any){
    return this.http.post<any>(`${this.url}set-status2`,
    resource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  setFileTreatment(resource:any){
    return this.http.post<any>(`${this.url}set-file-traitment`,
    resource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  delete(id:any){
    // ressource['method']='delete';
     return this.http.delete<any>(`${this.url}${id}`,
      ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
   }
 
}
