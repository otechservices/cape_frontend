import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class LocalStorageService {

    set(key: string, value: string) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string) {
        let el=localStorage.getItem(key)
      
        return el !=null ? JSON.parse(el):null;
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}