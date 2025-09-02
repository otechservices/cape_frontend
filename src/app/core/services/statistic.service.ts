import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  url=ConfigService.toApiUrl("statistics/");

  constructor(private http:HttpClient) { }

  getAll(type:any,agg?:any, service?:any){
    if (agg== undefined) {
      return this.http.get<any[]>(`${this.url}${type}?service_id=${service}`);

    }else{
      return this.http.get<any[]>(`${this.url}${type}/${agg}?service_id=${service}`);

    }
  }

}
