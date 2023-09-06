import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SesionComponent } from './sesion/sesion.component';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ReportesComponent } from './reportes/reportes.component';
import { ReactiveFormsModule } from '@angular/forms';

import { WebcamModule } from 'ngx-webcam';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { PruebaComponent } from './prueba/prueba.component';
import { MapaComponent } from './mapa/mapa.component';

import { BrowserModule } from '@angular/platform-browser';
//import { DataTablesModule } from 'angular-datatables';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    PagesComponent,
    SesionComponent,
    ReportesComponent,
    PruebaComponent,
    MapaComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    WebcamModule,
    BrowserModule,
    //DataTablesModule,
    NgxDatatableModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  exports:[
    DashboardComponent,
    UsuariosComponent,
    SesionComponent,
    ReportesComponent,
    PruebaComponent,
    MapaComponent,
  ],
   providers: [
  Geolocation,
  FingerprintAIO,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class PagesModule { }
