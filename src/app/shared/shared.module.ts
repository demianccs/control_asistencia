import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FixedSidebarComponent } from './fixed-sidebar/fixed-sidebar.component';



@NgModule({
  declarations: [
    HeaderComponent,
     BreadcrumbsComponent,
    FooterComponent,
    FixedSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    FixedSidebarComponent
  ]
})
export class SharedModule { }
