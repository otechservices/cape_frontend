import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class MailTestService {

  url=ConfigService.toApiUrl("mail-test");

  constructor(private http:HttpClient) { }

  /** Teste la configuration mail et envoie un message à `email`. */
  test(email:string){
    return this.http.post<any>(`${this.url}`, {email},
     ConfigService.httpHeader(localStorage.getItem(GlobalName.tokenName),true));
  }
}
