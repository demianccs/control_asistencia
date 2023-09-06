import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
//import { WebsocketGpsService } from 'src/app/services/websocket-gps.service';
import * as L from 'leaflet';
import { latLng, marker, tileLayer } from 'leaflet';
import { Marcaciones, envioEmail, filtroReportes } from 'src/app/models/marcaciones';
import { MarcacionesService } from 'src/app/services/marcaciones.service';

//import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  datosReporte: Marcaciones[] =[];

  map!: L.Map;
  userMarker!: L.Marker;
  userMarker1!: L.Marker;

  constructor(
    private geolocationService: GeolocationService,
    //private WebsocketGpsService: WebsocketGpsService,
    private _marcacionesService: MarcacionesService,
    //private datePipe: DatePipe
  ) { }

  ngOnInit() {



    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.geolocationService.getCurrentPosition().subscribe(position => {
      const { latitude, longitude } = position.coords;
      //console.log(position.coords)
      this.userMarker = L.marker([latitude, longitude]).addTo(this.map).bindTooltip('Yo', { permanent: true, direction: 'right' });
      this.map.setView([latitude, longitude], 13);

      const datos:any={
        tipo: "plataforma",
        usuario: "",
        plataforma: "",
        fecha_inicio: new Date().toISOString().split('T')[0],
        fecha_fin: new Date().toISOString().split('T')[0]
      }

      const markers = [

      this._marcacionesService.buscarMarcaciones(datos).subscribe(data =>{
        //this.datosReporte=data;
        //this.initTable('tablaReporte');
        for (let i = 0; i < data.length; i++) {
          const values = data[i].loc_ingreso.split(",");
          //console.log(values[0])
          L.marker([values[0], values[1]]).addTo(this.map).bindTooltip(data[i].nombre_usuario+' in: '+data[i].hora_ingreso, { permanent: true, direction: 'right' });
        }

      },error =>{
        console.log(error);
      })

      ];

    });



    // this.WebsocketGpsService.onNewLocation().subscribe((position: any) => {
    //   const { latitude, longitude } = position.coords;
    //   L.marker([latitude, longitude]).addTo(this.map);
    // });
  }
}
