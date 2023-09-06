import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marcaciones, filtroReportes, listaPlataforma, listaUsuarios, reportePerfil } from 'src/app/models/marcaciones';
import { MarcacionesService } from 'src/app/services/marcaciones.service';
import decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import Swal from 'sweetalert2';

import * as L from 'leaflet';
import { latLng, marker, tileLayer } from 'leaflet';

import { GeolocationService } from 'src/app/services/geolocation.service';

import { ColumnMode } from '@swimlane/ngx-datatable';




declare var $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent implements OnInit {


  listaUsuarios:listaUsuarios[] = [];
  listaPlataformas:listaPlataforma[] = [];
  opcionSeleccionada:string="usuario";
  reporteMarcaciones:filtroReportes[] = [];
  datosReporte: Marcaciones[] =[];
  reporteForm: FormGroup;
  id: any;
  reportePerfil: reportePerfil[] = [];

  defaultDateini: string="";
  defaultDatefin: string="";

  map!: L.Map;
  userMarker!: L.Marker;
  userMarker1!: L.Marker;

  selectedValue: any;

  ColumnMode = ColumnMode;

  rows: any[] = [];
  columns: any[] = [];
  pageSize = 10; // Number of items to show per page
  totalItems = 0; // Total number of items
  currentPage = 0; // Current page index
  forceColumnResize = false; // Initially set to false
  isLoading: boolean = false;

  plat: string="";


  //varibles globales
  token: any;
  token1: string | undefined;
  token2: any;
  L6_PLATAFORMA: any;
  L3_AREA: any;
  L7_CARGO: any;
  USER_ID: any;



constructor(private fb: FormBuilder,
            private httpClient: HttpClient,
            private router: Router,
            private _marcacionesService: MarcacionesService,
            private aRouter: ActivatedRoute,
            private geolocationService: GeolocationService) {

  this.reporteForm = this.fb.group({

      tipo: ['', Validators.required],
      usuario: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],

    })

// Set the default date to today's date
this.defaultDateini = new Date().toISOString().split('T')[0];
this.defaultDatefin = new Date().toISOString().split('T')[0];

this.columns = [
  { prop: 'nombre_usuario', name: 'Usuario'},
  { prop: 'fecha_ingreso', name: 'Fecha Ingreso' },
  { prop: 'fecha_salida', name: 'Fecha Salida'}
];

}







ngOnInit(): void {

  this.map = L.map('map').setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

  var markerIcon = L.icon({
    iconUrl: './assets/dist/img/marker-icon-black.png', // Path to the marker icon image
    iconSize: [20, 32], // Size of the icon image in pixels
    iconAnchor: [16, 16] // Anchor point of the icon relative to its position
  });

  this.geolocationService.getCurrentPosition().subscribe(position => {
    const { latitude, longitude } = position.coords;
    //console.log(position.coords)
    this.userMarker = L.marker([latitude, longitude], { icon: markerIcon }).addTo(this.map).bindTooltip('Yo', { permanent: true, direction: 'right' });
    this.map.setView([latitude, longitude], 13);

  });


this.obtenerUsuarios();
this.obtenerPlataformas();
//this.generarReporte();


this.token = decode(localStorage.getItem('token') || '{}');
this.token1 = JSON.stringify(this.token);
this.token2 = JSON.parse(this.token1);
this.L6_PLATAFORMA = this.token2.data.L6_PLATAFORMA;
this.L7_CARGO = this.token2.data.L7_CARGO;
this.L3_AREA = this.token2.data.L3_AREA
this.USER_ID = this.token2.data.USER_ID;

//console.log(this.L3_AREA);

}

obtenerUsuarios(){
  this.token = decode(localStorage.getItem('token') || '{}');
  this.token1 = JSON.stringify(this.token);
  this.token2 = JSON.parse(this.token1);
  this.L6_PLATAFORMA = this.token2.data.L6_PLATAFORMA;
  this.L7_CARGO = this.token2.data.L7_CARGO;
  this.L3_AREA = this.token2.data.L3_AREA
  this.USER_ID = this.token2.data.USER_ID;

  const datosenv:reportePerfil={
    id: this.USER_ID,
    l6: this.L6_PLATAFORMA,
    l3: this.L3_AREA
  }
  //console.log(datosenv)
  this._marcacionesService.apiObtenerUsuarios(datosenv).subscribe(data =>{
    //console.log(data);
    this.listaUsuarios=data;
  },error =>{
    console.log(error);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  })

}

obtenerPlataformas(){


  this.token = decode(localStorage.getItem('token') || '{}');
  this.token1 = JSON.stringify(this.token);
  this.token2 = JSON.parse(this.token1);
  this.L6_PLATAFORMA = this.token2.data.L6_PLATAFORMA;
  this.L7_CARGO = this.token2.data.L7_CARGO;
  this.L3_AREA = this.token2.data.L3_AREA
  this.USER_ID = this.token2.data.USER_ID;

  const datosenv:reportePerfil={
    id: this.USER_ID,
    l6: this.L6_PLATAFORMA,
    l3: this.L3_AREA
  }
  //console.log(datosenv)
  this._marcacionesService.apiObtenerPlataforma(datosenv).subscribe(data =>{
    //console.log(data);
    this.listaPlataformas=data;
  },error =>{
    console.log(error);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  })

}

generarReporte(){
  this.isLoading = true;
  const datos:filtroReportes={
    tipo: this.reporteForm.get('tipo')?.value,
    usuario: this.reporteForm.get('usuario')?.value,
    plataforma: this.reporteForm.get('usuario')?.value,
    fecha_inicio: this.reporteForm.get('fecha_inicio')?.value,
    fecha_fin: this.reporteForm.get('fecha_fin')?.value
  }


  $(".leaflet-marker-icon").remove();
  $(".leaflet-tooltip").remove();
      // Create a Leaflet icon marker
      var markerIconR = L.icon({
        iconUrl: './assets/dist/img/marker-icon-red.png', // Path to the marker icon image
        iconSize: [20, 32], // Size of the icon image in pixels
        //iconAnchor: [16, 16] // Anchor point of the icon relative to its position
      });

      // Create a Leaflet icon marker
      var markerIconB = L.icon({
        iconUrl: './assets/dist/img/marker-icon.png', // Path to the marker icon image
        iconSize: [20, 32], // Size of the icon image in pixels
        //iconAnchor: [16, 16] // Anchor point of the icon relative to its position
      });

      const markers = [

        this._marcacionesService.buscarMarcaciones(datos).subscribe(data =>{
          this.datosReporte=data;
          //this.initTable('tablaReporte');
          for (let i = 0; i < data.length; i++)
          {
            //console.log(data[i].loc_ingreso)
            if (data[i].loc_ingreso !== 'undefined' && data[i].loc_ingreso)

              {
                const values = data[i].loc_ingreso.split(",");
                L.marker([values[0], values[1]], { icon: markerIconB }).addTo(this.map).bindTooltip(data[i].nombre_usuario+' - in', { permanent: false, direction: 'right' }).on('click', (e: any) => {
                  this.alertaMarcador('Ingreso: '+data[i].nombre_usuario, data[i].fecha_ingreso.split("T")[0], data[i].hora_ingreso, data[i].so_on.split(",")[0], data[i].foto_ingreso)
                  //alert('Has hecho clic en el marcador.');
                });

              }
          }
          for (let i = 0; i < data.length; i++)
          {
            //console.log(data[i].loc_salida)
            if (data[i].loc_salida !== 'undefined' && data[i].loc_salida)

              {
                const values = data[i].loc_salida.split(",");
                L.marker([values[0], values[1]], { icon: markerIconR }).addTo(this.map).bindTooltip(data[i].nombre_usuario+' - out', { permanent: false, direction: 'right' }).on('click', (e: any) => {
                  this.alertaMarcador('Salida: '+data[i].nombre_usuario, data[i].fecha_salida.split("T")[0], data[i].hora_salida, data[i].so_off.split(",")[0], data[i].foto_salida)
                  //alert('Has hecho clic en el marcador.');
                });

              }
          }

          this.isLoading = false;
          this.plat=data[0].txt_plataforma;
        },error =>{
          console.log(error);
          localStorage.removeItem('token');
          this.router.navigateByUrl('/login')
        })

      ];

}

incrementarFecha(fecha: string, dias: number): Date {
  const fechaIncrementada = new Date(fecha);
  fechaIncrementada.setDate(fechaIncrementada.getDate() + dias);
  return fechaIncrementada;
}

mostrarImg(img64: string, coordenadas: string, id_marcacion: string, ip: string, so: string, tipo: string, nombre:string, fecha: string){
    Swal.fire({
      allowOutsideClick: false,
      html: '<h1>'+tipo+'</h1><small>'+fecha+'</small><p><img src="'+img64+'" alt="nombre" style="width: 150px; height: auto;"><br><b>'+nombre+'</b></br></p><small><b>ID:</b> '+id_marcacion+' - <b>IP</b>: '+ip+' - <b>SO</b>: '+so+'<br></small></br><p><iframe class="iframe" src="https://maps.google.com/?q='+coordenadas+'&z=15&t=m&output=embed" frameborder="0" style="border:0" allowfullscreen style="border: 0;width: -webkit-fill-available;height: -webkit-fill-available;"></iframe></p>',
      confirmButtonColor: '#007bff',
      confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      //this.recargarPagina();
    }
    });
}

alertaMarcador(nombre: string, fecha: string, hora: string, so: string, img64: string){
  Swal.fire({
    allowOutsideClick: false,
    html: '<img src="'+img64+'" alt="nombre" style="width: 150px; height: auto;"><p></p><p><b>'+nombre+'</b></p><p>Fecha: = <b>'+fecha+'</b> Hora: = <b>'+hora+'</b></p><p>SO:  = <b>'+so+'</b></p',
    confirmButtonColor: '#007bff',
    confirmButtonText: 'Cerrar'
}).then((result) => {
  if (result.isConfirmed) {
    //this.recargarPagina();
  }
  });
}

onPageChange(event: any) {
  this.currentPage = event.offset;
  // Fetch data for the new page using the updated offset
  // You may need to make an API call or update the data array directly
  // based on your data retrieval mechanism
}

onSort(event: any){
  console.log(event);
}

}
