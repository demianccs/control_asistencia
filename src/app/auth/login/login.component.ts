import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Imagebk } from 'src/app/models/imagenbk';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  Imagebk: Imagebk[] = [];
  user = {
    userName: '',
    pass: '',
    
   
  }

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
      private authService: AuthService,
      private router: Router
     
      ) { }

    ngOnInit() {

    }

    keyPress(event: KeyboardEvent) {
       if( event.key == 'Enter' ){
        this.logIn();
        }
  }

    
    logIn() {
      console.log(this.user);
      this.authService.singin(this.user).subscribe( res => {
        if(res==='Usuario o clave incorrecto'){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            html: '<p class="msg-login">Nombre de usuario incorrecto ó contraseña incorreta</p>',
            showConfirmButton: false,
            timer: 1500
          })
         
        }else{
          localStorage.setItem('token', res.token);
          this.router.navigate(['']);
        }
      })
    }
}
