import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  url = ConfigService.toApiUrl('responses');

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url, ConfigService.httpHeader(localStorage.getItem(GlobalName.token)));
  }

  store(ressource: object) {
    return this.http.post(this.url, ressource, ConfigService.httpHeader(localStorage.getItem(GlobalName.token)));
  }
  show(id: number) {
    return this.http.get(`${this.url}/${id}`, ConfigService.httpHeader(localStorage.getItem(GlobalName.token)));
  }
  update(ressource: object, id: number) {
    return this.http.patch(`${this.url}/${id}`, ressource, ConfigService.httpHeader(localStorage.getItem(GlobalName.token)));
  }
  delete(id: number) {
    return this.http.get(`${this.url}/${id}`, ConfigService.httpHeader(localStorage.getItem(GlobalName.token)));
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, ConfigService.httpHeader(localStorage.getItem(GlobalName.token)));
  }


  needCorrection(ressource: any) {
    return this.http.post(`${this.url}/step/need-correction`,ressource, ConfigService.httpHeader(localStorage.getItem(GlobalName.token)));
  }

  decline(ressource: any) {
    return this.http.post(`${this.url}/step/declined`,ressource, ConfigService.httpHeader(localStorage.getItem(GlobalName.token)));
  }

  validate(ressource: any) {
    return this.http.post(`${this.url}/step/validated`,ressource, ConfigService.httpHeader(localStorage.getItem(GlobalName.token)));
  }

}
