import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HoraservidorService {


  url = 'https://api.datacom.com.bo/horaservidor';
  //url = 'http://172.25.39.36:3000/horaservidor'

  constructor(private http: HttpClient) { }

  obtenerHoraFecha(): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.url, { headers })

  }

}

