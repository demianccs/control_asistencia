import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { LoginModule } from './login/login.module';

const routes:Routes =[
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent, loadChildren: ()=> import('./login/login.module').then(m => m.LoginModule)}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AuthRoutingModule { }
