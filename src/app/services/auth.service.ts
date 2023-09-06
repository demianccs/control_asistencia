import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../models/login'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 //private URL = 'http://172.25.39.36:3100/user/singin';
 //https://api.datacomapp.xyz/marcaciones
 private URL = 'https://api.datacom.com.bo/user/singin';

  constructor(
    private JwtHelper: JwtHelperService,
    private http: HttpClient) { }


  singin(user: User): Observable<any>{
    return this.http.post<any>(this.URL, user);

  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(token && this.JwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}
