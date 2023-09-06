import { Component } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-fixed-sidebar',
  templateUrl: './fixed-sidebar.component.html',
  styleUrls: ['./fixed-sidebar.component.css']

})



export class FixedSidebarComponent {

  menuItems?:any[];
  token: any;
  token1: string | undefined;
  token2: any;
  DESCRIPTION: any;
  PLATAFORMA: any;
  NOM_SUPERVISOR: any;
  UNIDAD: any;
  area: any;
  AP_PICTURE1: any;
  constructor(private sideBarServices: SidebarService,private router: Router ){
    this.menuItems= this.sideBarServices.menu;

  }

  ngOnInit(): void {

    this.token = decode(localStorage.getItem('token')  || '{}');
    this.token1 = JSON.stringify(this.token);
    this.token2 = JSON.parse(this.token1);
    this.DESCRIPTION = this.token2.data.DESCRIPTION;
    this.AP_PICTURE1 = this.token2.data.AP_PICTURE1;
    this.PLATAFORMA = this.token2.data.PLATAFORMA;
    this.NOM_SUPERVISOR = this.token2.data.NOM_SUPERVISOR;
    this.UNIDAD = this.token2.data.UNIDAD;
    this.area = this.token2.data.area;

  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }
}
