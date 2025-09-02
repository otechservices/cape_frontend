import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.vps';

export const ConfigService: any = {
  apiVersion: environment.API_VERSION,
  apiScheme: environment.API_SCHEME,
  apiFile: environment.API_FILE,
  apiDomain: environment.API_DOMAIN,
  dir_dist: environment.DIST_DIR,
  home_uri: environment.HOME_URI,
  admin_url: environment.ADMIN_URL,
  toApiUrl(path:any) {

    return `${this.apiScheme}://${this.apiDomain}/${path}`;
  },
  toFile(path:any) {
    return `${this.apiScheme}://${this.apiFile}/${path}`;
  },
  httpHeader(token=null,isJson=true){
      
      if(token!=null){
        return {
            headers: new HttpHeaders({
            'Authorization': 'Bearer ' + token,
              'Access-Control-Allow-Origin':'*',
              'Accept':'application/json'
          })
          };
      }
      return {
        headers: new HttpHeaders({})
      };
    
    
  },
  toWsUrl(path:any){
    return `wss://${this.apiDomain}/${path}`
  }
}
