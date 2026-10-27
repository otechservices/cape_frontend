import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class CpsService {
  url=ConfigService.toApiUrl("cps/");

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any[]>(`${this.url}`);
  }

  store(ressource:any){
    return this.http.post<any>(`${this.url}`, ressource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
  storeDistricts(ressource:any){
    return this.http.post<any>(`${this.url}store-districts/all`, ressource,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  /** Retire un arrondissement de la couverture du GUPS. */
  removeDistrict(cps_id:any, district_id:any){
    return this.http.delete<any>(`${this.url}${cps_id}/districts/${district_id}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  /** Fait de ce GUPS celui qui reçoit les nouveaux dossiers de l'arrondissement. */
  setDefaultDistrict(cps_id:any, district_id:any){
    return this.http.post<any>(`${this.url}${cps_id}/districts/${district_id}/default`, {},
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  update(id:any,ressource:any){
    //ressource['method']='_patch';

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


  exportXls(){
    return this.http.get<any>(`${this.url}exports/pdf`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }

  setStatus(id:any,status:any){
    return this.http.get<any>(`${this.url}set-status/${id}/${status}`,
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
}
