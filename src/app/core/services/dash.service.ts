import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  url=ConfigService.toApiUrl("dash/");

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any[]>(`${this.url}`);
  }
  
}
