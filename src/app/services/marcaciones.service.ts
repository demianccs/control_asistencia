import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marcaciones, filtroReportes, envioEmail  } from '../models/marcaciones';


@Injectable({
  providedIn: 'root'
})
export class MarcacionesService {
//  url = 'http://172.25.39.36:3000/marcaciones/';
//  urlreg = 'http://172.25.39.36:3000/marcaciones/registrar/';
//  urlsal = 'http://172.25.39.36:3000/marcaciones/salida/';
//  urlusu = 'http://172.25.39.36:3000/marcaciones/usuarios/';
//  urlPlataforma = 'http://172.25.39.36:3000/marcaciones/plataforma/';
//  urlemail = 'http://172.25.39.36:3000/enviocorreo/';

  url = 'https://api.datacom.com.bo/marcaciones/';
  urlreg = 'https://api.datacom.com.bo/marcaciones/registrar/';
  urlsal = 'https://api.datacom.com.bo/marcaciones/salida/';
  urlusu = 'https://api.datacom.com.bo/marcaciones/usuarios/'
  urlPlataforma = 'https://api.datacom.com.bo/marcaciones/plataforma/';
  urlemail = 'https://api.datacom.com.bo/enviocorreo/';

  constructor(private http: HttpClient) { }


  apiObtenerUsuarios(datosenv: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.urlusu, datosenv, { headers })
  }

  apiObtenerPlataforma(datosenv: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //console.log(headers);
    return this.http.post(this.urlPlataforma, datosenv, { headers })
  }

  obtenerMarcaciones(id: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
     return this.http.get(this.url + id, { headers })
  }

  buscarMarcaciones(marcaciones: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.url, marcaciones, { headers });
  }

  guardaMarcaciones(marcaciones: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
   return this.http.post(this.urlreg, marcaciones, { headers });
  }

  salidaMarcaciones(marcaciones: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.urlsal, marcaciones, { headers });
  }

  enviEmail(envioemail: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.urlemail, envioemail, { headers });
  }


}
