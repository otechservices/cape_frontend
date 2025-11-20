import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class PublicService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(ConfigService.toApiUrl('send-contact'), ConfigService.httpHeader(localStorage.getItem(GlobalName.token)));
  }
}
