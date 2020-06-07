import { Injectable } from '@angular/core';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from "rxjs/operators";

interface User {
  result: {
    created_at : Date,
    email: string,
    id: number,
    firstName: string,
    lastName: string,
    updated_at: Date,
    searchingForHelp: boolean,
  }
}

@Injectable()

export class AuthService {

  private api:string = 'http://bookstore20hue.s1610456006.student.kwmhgb.at/api/auth';

  constructor(private http: HttpClient ) { }

  login (email: string, password: string) {
    return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
  }
  public isSearchingForHelp(){
    if (localStorage.getItem("searchingForHelp") === "1") {
      return true;
    }
    return false;
  };

  public getCurrentUserId() {
    return Number.parseInt(localStorage.getItem('id'));
  }

  public setLocalStorage(token: string) {
    const decodedToken = decode(token);
    //console.log(decodedToken);
    localStorage.setItem('token', token);
    localStorage.setItem('id', decodedToken.user.id);
    localStorage.setItem("searchingForHelp", decodedToken.user.searchingForHelp);
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('searchingForHelp');
    //console.log('logged out');
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
  public isLoggedIn(){
    if (isNotNullOrUndefined(localStorage.getItem("token"))) {
      let token : string = localStorage.getItem("token");
      const decodedToken = decode(token);

      let expirationDate : Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log("token expired");
        localStorage.removeItem("token");
        return false;
      }
      return true;
    } else {
      console.log("login fehlgeschlafen, nicht eingeloggt");
      return false;
    }
  }
}
