import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

/*
    Created By  : Arun Joy
    Created On  : 13-01-2020
    Created For : For decrypting the crypto encrpited data.
*/

@Injectable({
  providedIn: 'root'
})
export class OldCryptoService {

  constructor() { }

   //The get method is use for decrypt the value.
   get(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
