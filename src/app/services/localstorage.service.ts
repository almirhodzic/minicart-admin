import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  sizeOfLocalStorage() {
    let _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen;};
    const Kb = "LocalStorage: " + (_lsTotal / 1024).toFixed(2) + " Kbyte";
    return Kb;
  }
}
