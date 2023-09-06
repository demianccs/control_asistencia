import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { SesionComponent } from './sesion/sesion.component';
import { ReportesComponent } from './reportes/reportes.component';
import { PruebaComponent } from './prueba/prueba.component';
import { MapaComponent } from './mapa/mapa.component';


const routes: Routes = [
  {path:'', component:PagesComponent,
  children:[
    {path:'', component: SesionComponent, data:{titulo:'Registro de marcaciones'}, canActivate:[AuthGuard]},
    {path:'reportes', component: ReportesComponent, data:{titulo:'Reportes'}, canActivate:[AuthGuard]},
    {path:'sesion', component: SesionComponent, data:{titulo:'Registro de marcaciones'} , canActivate:[AuthGuard]},
    {path:'prueba', component: PruebaComponent, data:{titulo:'Pagina de pruebas'} , canActivate:[AuthGuard]},
    {path:'mapa', component: MapaComponent, data:{titulo:'Mapa openlayers'} , canActivate:[AuthGuard]}
  ],  canActivate:[AuthGuard]
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
