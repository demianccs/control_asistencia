import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plataforma } from '../models/plataforma';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {
 // url = 'http://172.25.39.36:3100/api/plataforma/';
 // url = 'http://172.25.39.36:3100/api/plataforma/';

  url = 'https://api.datacom.com.bo/api/plataforma/';
 // url = 'https://api.datacomapp.xyz/api/plataforma/';

  constructor(private http: HttpClient) { }


  getPlataforma(): Observable<any> {
    return this.http.get(this.url)
  }

  eliminarPlataforma(_id: string): Observable<any> {
    return this.http.delete(this.url + _id)
  }

  guardarPlataforma(plataforma: Plataforma): Observable<any> {
    return this.http.post(this.url, plataforma);
  }

  obtenerPlataforma(_id: string): Observable<any> {
    return this.http.get(this.url + _id);
  }

  editarPlataforma(_id: string, outcome: any): Observable<any> {
    return this.http.put(this.url + _id, outcome);
  }

}
