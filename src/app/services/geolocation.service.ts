import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() { 
   
  }

  getCurrentPosition(): Observable<GeolocationPosition> {
     return new Observable((observer: Observer<GeolocationPosition>) => {
      if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
       (position: GeolocationPosition) => {
       observer.next(position);
       observer.complete();
     },
     (error: GeolocationPositionError) => {
       observer.error(error);
     }
       );
    } else {
     console.log('debe activar la geolocalizacion');
     observer.error('Geolocation not supported in this browser.');
    }
     });
    }

  
}
