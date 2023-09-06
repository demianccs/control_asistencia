import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[]=[{
    titulo:'Dashboard',
    icono:'nav-icon fas fa-tachometer-alt',
    submenu:[
      {titulo:'Sesión', url:'sesion', icono:'fa fa-users'},
      {titulo:'Reportes', url:'reportes', icono:'fa fa-table'},
      //{titulo:'Mapa', url:'mapa', icono:'fa fa-map-marker'}

    ]
  }]
}
