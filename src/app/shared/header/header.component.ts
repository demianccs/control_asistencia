import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuItems?:any[];
  constructor(private sideBarServices: SidebarService,private router: Router ){
    this.menuItems= this.sideBarServices.menu;
    console.log(this.menuItems)
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }

}
