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
export class CryptoService {

  constructor() { }

  //The get method is use for decrypt the value.
  get(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    // console.log("====value=====", decrypted.toString(CryptoJS.enc.Utf8));
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  encrypt(value) {
    let b64 = CryptoJS.AES.encrypt(value.toString(), "etarucca").toString();
    let e64 = CryptoJS.enc.Base64.parse(b64);
    let encryptedCode = e64.toString(CryptoJS.enc.Hex);
    return encryptedCode;
  }

  decrypt(value) {
    var reb64 = CryptoJS.enc.Hex.parse(value);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, "etarucca");
    var dycryptedCode = decrypt.toString(CryptoJS.enc.Utf8);
    return dycryptedCode;
  }

}
