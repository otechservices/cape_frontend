import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url=ConfigService.toApiUrl("searches/");

  constructor(private http:HttpClient) { }

  getAll(type:any,agg?:any,service?:any){
    return this.http.get<any[]>(`${this.url}${type}?service_id=${service}`);

  }
}
