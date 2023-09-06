import { Component, OnInit,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marcaciones, envioEmail } from 'src/app/models/marcaciones';
import { MarcacionesService } from 'src/app/services/marcaciones.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//decodificar token
import decode from 'jwt-decode';
//ngx-device-detector
import { DeviceDetectorService } from 'ngx-device-detector';
//sweetalert2
import Swal from 'sweetalert2';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

import { HoraservidorService } from 'src/app/services/horaservidor.service';

import { ImageService } from 'src/app/services/image.service';









@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})

@Injectable({
   providedIn: 'root'
  })

export class SesionComponent implements OnInit {

  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = ''
  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  facingMode: string = 'user';  //Set front camera

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
        result.facingMode = { ideal: this.facingMode };
    }
    return result;
}






  marcaciones: Marcaciones[] = [];
  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: any;
  today = new Date();
  hora:any;
  regHora:any;
  horaReg: any;
  minutosReg: any;
  segundosReg: any;
  fechaFirst: any;
  horaIngreso: any;
  horaSalida: any;
  regId:any;
  nd:any;
  ipReg:any;
  lastItem: any;
  accionBoton:number=0;
  textoBoton:string='MARCAR INGRESO';
  fechaActual:any;

  token: any;
  token1: string | undefined;
  token2: any;
  DESCRIPTION: any;
  PLATAFORMA: any;
  EMAIL_ADDRESS: any;
  EMAIL_SUPERVISOR: any;
  USER_ID: any;
  ipAddress:any="";
  latitude?: number;
  longitude?: number;
  coordenadas?: string;
  googleMaps?: SafeResourceUrl;
  browserName?: string;
  osInfo?:string;
  boton:any;

  horaActualServidor: any;
  FechaActualServidor: any;
  unixTimestampActualServidor: any;

  validar_reg?:string="NO";

  camaraActiva:string="NO";
  gpsActiva:string="NO"

  htmlEmail: any;

  prueba: any;


  get isUserLocationReady(): boolean{
    return !!this.coordenadas;
  }


 constructor(
  private fb: FormBuilder,
  private router: Router,
  private _marcacionesService: MarcacionesService,
  private aRouter: ActivatedRoute,
  private http: HttpClient,
  private geolocationService: GeolocationService,
  private sanitizer: DomSanitizer,
  private deviceService: DeviceDetectorService,
  private _HoraservidorService: HoraservidorService,
  private imageService: ImageService
  ) {

  this._HoraservidorService.obtenerHoraFecha().subscribe(data => {
    this.horaActualServidor = data.horaActual;
    this.FechaActualServidor = data.FechaActual;
    this.unixTimestampActualServidor = data.unixTimestampActual;
    }, error => {
    console.log(error);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  });


  this.geolocationService.getCurrentPosition().subscribe(

    (position: GeolocationPosition) => {

     this.latitude = position.coords.latitude;
     this.longitude = position.coords.longitude;
     this.coordenadas= this.latitude+','+this.longitude;
     console.log(this.coordenadas);

     const url = 'https://maps.google.com/?q='+this.coordenadas+'&z=15&t=m&output=embed';
      this.googleMaps = this.sanitizer.bypassSecurityTrustResourceUrl(url);

     },
        (error: any) => {
        console.error('Error obtaining geolocation', error);
     }
    );

 this.productoForm = this.fb.group({
 producto: ['', Validators.required],
 categoria: ['', Validators.required],
 ubicacion: ['', Validators.required],
 precio: ['', Validators.required],
  });

}

 ngOnInit(): void {


  this.boton = document.getElementById("marcar");
  this.boton.setAttribute('disabled', true);

 this.mostrarHora();

 this.browserName = this.detectBrowserInfo();
 this.osInfo = this.detectOsInfo();

 this.getIPAddress2().subscribe((res: any) => {
    this.ipAddress=res.client_ip;
    }, error => {
      this.getIPAddress().subscribe((res: any) => {
        this.ipAddress=res.ip;
        }, error => {
          console.log(error);
       });
   });



  this.token = decode(localStorage.getItem('token') || '{}');
  this.token1 = JSON.stringify(this.token);
  this.token2 = JSON.parse(this.token1);
  this.DESCRIPTION = this.token2.data.DESCRIPTION;
  this.PLATAFORMA = this.token2.data.L6_PLATAFORMA;
  this.USER_ID = this.token2.data.USER_ID;
  this.EMAIL_ADDRESS = this.token2.data.EMAIL_ADDRESS;
  this.EMAIL_SUPERVISOR =this.token2.data.EMAIL_SUPERVISOR;


 this._marcacionesService.obtenerMarcaciones(this.USER_ID).subscribe(data => {
    this.marcaciones = data;
    this.lastItem = this.marcaciones[0];
    this.fechaFirst= this.lastItem.fecha_ingreso;
    this.horaIngreso= this.lastItem.hora_ingreso;
    this.horaSalida= this.lastItem.hora_salida;
    this.regId= this.lastItem.id_marcacion;
    this.buscarMarcacion();
    }, error => {
    console.log(error);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
 })

 //this.buscarMarcacion();

}


recargarPagina(){
  window.location.reload();
}

getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }

getIPAddress2() {
    return this.http.get("https://worldtimeapi.org/api/timezone/America/La_Paz");
  }

mostrarHora(){
  function convertUnixTimestamp(unixTimestamp: any) {
    // Unix timestamp en segundos
    var timestamp = unixTimestamp;
    // Convertir a milisegundos multiplicando por 1000
    var milliseconds = timestamp * 1000;
    // Crear un objeto Date
    var date = new Date(milliseconds);
    // Sumar horas
    var hoursToAdd = 4;
    date.setHours(date.getHours() + hoursToAdd);
    // Obtener el nuevo timestamp
    var newTimestamp = Math.floor(date.getTime() / 1000);
    return date;
  }

    this._HoraservidorService.obtenerHoraFecha().subscribe(data => {

        this.horaActualServidor = data.horaActual;
        this.FechaActualServidor = data.FechaActual;
        this.unixTimestampActualServidor = data.unixTimestampActual;

        var fecha = convertUnixTimestamp(this.unixTimestampActualServidor);
        // Incrementa un minuto
        fecha.setSeconds(fecha.getSeconds() + 1);

        // Muestra la fecha actualizada
        // Configura un intervalo para sumar un minuto cada minuto
        setInterval(() => {
          //fecha.setSeconds(fecha.getSeconds() + 1);
          //console.log(fecha);
          this.hora = fecha.setSeconds(fecha.getSeconds() + 1)
          var s = new Date(this.hora).toLocaleTimeString("en-US")
          this.horaActualServidor = s
        }, 1000);

    }, error => {
    //console.log(error);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  });
}

solicitarGeolocalizacion(){
  navigator.permissions.query({ name: 'geolocation' })
  .then(permission =>
     {
      if(permission.state === "granted")
      {
        this.gpsActiva="SI";
        this.camara();
        //this.boton.removeAttribute('disabled');
      }else{
        this.boton.setAttribute('disabled', true);
        Swal.fire({
          allowOutsideClick: false,
          title: '<strong style="color: #2a70bb">Sistema de Marcaciones</strong>',
          html: '<h4 style="color: #258bdc"><b>Debe activar la geolocalización!</b></h4>',
          confirmButtonColor: '#08b591',
          confirmButtonText: 'Aceptar'
      }).then((result) => {
          if (!result.isConfirmed) {
            this.recargarPagina();
          }
        });
      }
    //this.boton.removeAttribute('disabled');
    }
  );
}

detectOsInfo(): string {
  const os_name = this.deviceService.os;
  const os_ver = this.deviceService.os_version;
  return  os_name+','+os_ver;
}

detectBrowserInfo(): string {
  const browser_name = this.deviceService.browser;
  const browser_ver = this.deviceService.browser_version;
  return  browser_name+','+browser_ver;
}



buscarMarcacion(){
  const diauno = new Date(this.fechaFirst);
  diauno.setDate(diauno.getDate() + 1);
  const regDia=diauno.getDate();
  const regMes=("0" + (diauno.getMonth() + 1)).slice(-2);
  const regAnio= diauno.getFullYear();
  const reg_fecha = String(regAnio+"-"+regMes+"-"+("0" + regDia).slice(-2));

  this.fechaActual = this.FechaActualServidor;

  console.log(this.fechaActual," - ",reg_fecha)

  if(this.fechaActual==reg_fecha){

        if(this.horaSalida=='00:00:00' || this.horaSalida==null){
          this.textoBoton='MARCAR SALIDA';
          this.accionBoton=2;
          this.solicitarGeolocalizacion();
        }else{
          this.textoBoton='MARCAR INGRESO';
          this.accionBoton=1;
          this.solicitarGeolocalizacion();
        }
  }else{
    this.textoBoton='MARCAR INGRESO';
    this.accionBoton=1;
    this.solicitarGeolocalizacion();
  }

console.log(this.ipAddress)

}

snapshot(event: WebcamImage){
  //console.log(event);
  this.previewImage = event.imageAsDataUrl;
  //console.log(this.previewImage)
}

registrar(){
      this.trigger.next();
      switch (this.accionBoton) {
      case 0:
          console.log("No ralizar accion");
          break;
      case 1:
        this.ingreso()
          break;
      case 2:
          this.salida()
          break;
        default:
          console.log("No realizar accion!");
          break;
      }
    }
    incrementarFecha(fecha: string, dias: number): Date {
      const fechaIncrementada = new Date(fecha);
      fechaIncrementada.setDate(fechaIncrementada.getDate() + dias);
      return fechaIncrementada;
}



ingreso(){

      this._HoraservidorService.obtenerHoraFecha().subscribe(data => {
        this.horaActualServidor = data.horaActual;
        this.FechaActualServidor = data.FechaActual;
        this.unixTimestampActualServidor = data.unixTimestampActual;

        this.imageService.reduceImageSize(this.previewImage, 250, 150)
            .then((reducedImage) => {
                  // Aquí puedes hacer lo que desees con la imagen reducida

              const MARCAR_INGRESO: any = {
                id_user: this.USER_ID,
                fecha_ingreso: this.FechaActualServidor,
                hora_ingreso: this.horaActualServidor,
                loc_ingreso: this.coordenadas,
                estado:'1',
                ip_on: this.ipAddress,
                dispositivo_on: this.browserName,
                so_on:this.osInfo,
                trabajo:'',
                plataforma: this.PLATAFORMA,
                tiempo_ingreso:this.unixTimestampActualServidor,
                foto_ingreso: reducedImage
              }

                this._marcacionesService.guardaMarcaciones(MARCAR_INGRESO).subscribe(data => {
                //console.log(data);
                this.validar_reg=data;
                }, error => {
                console.log(error);
                });

                const envioemail: envioEmail = {
                  asunto : 'INGRESO MARCACION WEB',
                  //email : 'dolmedo@entel.bo',
                  email: this.EMAIL_ADDRESS+', '+this.EMAIL_SUPERVISOR,
                  mensaje: `<!DOCTYPE html>
                  <html>
                  <head>
                    <title>Ficha de Empleado</title>
                    <style>
                      table {
                        width: 50%;
                        border-collapse: collapse;
                      }

                      th, td {
                        padding: 8px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                      }

                      th {
                        background-color: #f2f2f2;
                      }
                    </style>
                  </head>
                  <body>
                    <center>
                    <h2>INGRESO MARCACION WEB</h2>

                    <table>
                            <tr>
                                <td rowspan="6"><img src="`+reducedImage+`'" alt="FOTO" style="width: 100%; height: auto;"></td>
                                <th colspan="2" style="text-align: center;">`+this.DESCRIPTION+`</th>
                            </tr>
                            <tr>
                                <th>FECHA INGRESO</td>
                                <td>`+this.FechaActualServidor+`</td>
                            </tr>
                            <tr>
                                <th>HORA INGRESO</td>
                                <td>`+this.horaActualServidor+`</td>
                            </tr>
                            <tr>
                                <th>COORDENADAS INGRESO</td>
                                <td><a href="https://www.google.com/maps?q=`+this.coordenadas+`">`+this.coordenadas+`</a></td>
                            </tr>
                            <tr>
                                <th>IP INGRESO</td>
                                <td>`+this.ipAddress+`</td>
                            </tr>
                            <tr>
                                <th>SO INGRESO</td>
                                <td>`+this.osInfo+`</td>
                            </tr>
                    </table>
                    </center>
                  </body>
                  </html>
                  `
                }

                this._marcacionesService.enviEmail(envioemail).subscribe(data => {
                  //console.log("enviado");
                  this.validar_reg=data;
                  }, error => {
                  console.log(error);
                });

                Swal.fire({
                  allowOutsideClick: false,
                  html: '<h4 style="color: #258bdc"><b>MARCACION DE INGRESO REGISTRADA </b></h4><br><p class="hora-reloj">Hora: '+this.horaActualServidor+'</p>',
                  confirmButtonColor: '#08b591',
                  confirmButtonText: 'Aceptar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.recargarPagina();
                  }
                  });
            }).catch((error) => {
                  console.error(error);
                  localStorage.removeItem('token');
                  this.router.navigateByUrl('/login')
          });
      });
}


salida(){

  this._HoraservidorService.obtenerHoraFecha().subscribe(data => {
    this.horaActualServidor = data.horaActual;
    this.FechaActualServidor = data.FechaActual;
    this.unixTimestampActualServidor = data.unixTimestampActual;

    this.imageService.reduceImageSize(this.previewImage, 250, 150)
            .then((reducedImage) => {
              // Aquí puedes hacer lo que desees con la imagen reducida

              const MARCAR_SALIDA: any = {
                id_marcacion: this.regId,
                fecha_salida:this.FechaActualServidor,
                hora_salida: this.horaActualServidor,
                loc_salida: this.coordenadas,
                ip_off:this.ipAddress,
                dispositivo_off:this.browserName,
                so_off:this.osInfo,
                tiempo_salida:this.unixTimestampActualServidor,
                foto_salida: reducedImage
              }
              //console.log(MARCAR_SALIDA)

              this._marcacionesService.salidaMarcaciones(MARCAR_SALIDA).subscribe(data => {
                console.log('Exito' );
                this.validar_reg=data;
                }, error => {
                console.log(error);
                });

                const envioemail: envioEmail = {
                  asunto : 'SALIDA MARCACION WEB',
                  //email : 'dolmedo@entel.bo',
                  email: this.EMAIL_ADDRESS+', '+this.EMAIL_SUPERVISOR,
                  mensaje: `<!DOCTYPE html>
                  <html>
                  <head>
                    <title>Ficha de Empleado</title>
                    <style>
                      table {
                        width: 50%;
                        border-collapse: collapse;
                      }

                      th, td {
                        padding: 8px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                      }

                      th {
                        background-color: #f2f2f2;
                      }
                    </style>
                  </head>
                  <body>
                    <center>
                    <h2>SALIDA MARCACION WEB</h2>

                    <table>
                            <tr>
                                <td rowspan="6"><img src="`+reducedImage+`'" alt="FOTO" style="width: 100%; height: auto;"></td>
                                <th colspan="4" style="text-align: center;">`+this.DESCRIPTION+`</th>
                            </tr>
                            <tr>
                                <th>FECHA SALIDA</td>
                                <td>`+this.FechaActualServidor+`</td>
                            </tr>
                            <tr>
                                <th>HORA SALIDA</td>
                                <td>`+this.horaActualServidor+`</td>
                            </tr>
                            <tr>
                                <th>COORDENADAS SALIDA</td>
                                <td><a href="https://www.google.com/maps?q=`+this.coordenadas+`">`+this.coordenadas+`</a></td>
                            </tr>
                            <tr>
                                <th>IP SALIDA</td>
                                <td>`+this.ipAddress+`</td>
                            </tr>
                            <tr>
                                <th>SO SALIDA</td>
                                <td>`+this.osInfo+`</td>
                            </tr>
                    </table>
                    </center>
                  </body>
                  </html>
                  `
                }

                this._marcacionesService.enviEmail(envioemail).subscribe(data => {
                  //console.log("enviado");
                  this.validar_reg=data;
                  }, error => {
                  console.log(error);
                });

                Swal.fire({
                allowOutsideClick: false,
                html: '<h4 style="color: #258bdc"><b>MARCACION DE SALIDA REGISTRADA</b></h4><br><p class="hora-reloj">Hora: '+this.horaActualServidor+'</p>',
                confirmButtonColor: '#007bff',
                confirmButtonText: 'Aceptar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.recargarPagina();
                  }
                });
              })
              .catch((error) => {
                console.error(error);
                localStorage.removeItem('token');
                this.router.navigateByUrl('/login')
              });
      })
}

validar(){
  console.log(this.horaActualServidor)
}

camara(){
    navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      this.boton.removeAttribute('disabled');
      this.camaraActiva="SI"
    })
    .catch((error) => {
        Swal.fire({
          allowOutsideClick: false,
          title: '<strong style="color: #2a70bb">Sistema de Marcaciones</strong>',
          html: '<h4 style="color: #258bdc"><b>Debe activar la camara!</b></h4>',
          confirmButtonColor: '#08b591',
          confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (!result.isConfirmed) {
              this.recargarPagina();
            }
        });
        //console.log("sin camara")
        this.boton.setAttribute('disabled', true)
        //this.boton.removeAttribute('disabled')
    });
}

reduceImagen(base64: any){
  this.imageService.reduceImageSize(base64, 250, 150)
    .then((reducedImage) => {
      return reducedImage
    })
    .catch((error) => {
      console.error(error);
      return "NO"
    });
}




enviarCorreo(envioemail: any){
  this._marcacionesService.enviEmail(envioemail).subscribe(data => {
    //console.log("enviado");
    return "OK";
    }, error => {
    console.log(error);
    return "NO";
  });
}





}
