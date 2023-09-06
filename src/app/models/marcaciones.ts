import { Plataforma } from './plataforma';
export class Marcaciones {

     [x: string]: any|string;

     id_marcacion: Number;
     id_user: string;
     fecha_ingreso: string;
     hora_ingreso: string;
     loc_ingreso: string;
     fecha_salida: string;
     hora_salida: string;
     loc_salida: string;
     estado: string;
     ip_on: string;
     dispositivo_on: string;
     so_on: string;
     ip_off: string;
     dispositivo_off: string;
     so_off: string;
     trabajo: string;
     plataforma: string;
     tiempo_ingreso: string;
     tiempo_salida: string;
     nombre_usuario: string;
     txt_plataforma: string;
     foto_ingreso: string;
     foto_salida: string

     constructor(id_marcacion: Number, id_user: string, fecha_ingreso: string, hora_ingreso: string, loc_ingreso: string, fecha_salida: string, hora_salida: string, estado: string, ip_on: string, dispositivo_on: string, so_on: string, ip_off: string, dispositivo_off: string, so_off: string, trabajo: string, plataforma: string,tiempo_ingreso: string, tiempo_salida: string, nombre_usuario: string, txt_plataforma: string, foto_ingreso: string, foto_salida: string, loc_salida: string){

     this.id_marcacion = id_marcacion;
     this.id_user = id_user;
     this.fecha_ingreso = fecha_ingreso;
     this.hora_ingreso = hora_ingreso;
     this.loc_ingreso = loc_ingreso;
     this.fecha_salida = fecha_salida;
     this.hora_salida = hora_salida;
     this.loc_salida = loc_salida;
     this.estado = estado;
     this.ip_on = ip_on;
     this.dispositivo_on = dispositivo_on;
     this.so_on = so_on;
     this.ip_off = ip_off;
     this.dispositivo_off = dispositivo_off;
     this.so_off = so_off;
     this.trabajo = trabajo;
     this.plataforma = plataforma;
     this.tiempo_ingreso= tiempo_ingreso;
     this.tiempo_salida=tiempo_salida;
     this.nombre_usuario = nombre_usuario;
     this.txt_plataforma = txt_plataforma;
     this.foto_ingreso = foto_ingreso;
     this.foto_salida = foto_salida
     }

    };

    export class listaUsuarios {

     USER_ID: Number;
     DESCRIPTION: string;

     constructor(USER_ID: Number, DESCRIPTION: string){
         this.USER_ID = USER_ID;
         this.DESCRIPTION = DESCRIPTION;
     }

 };

 export class listaPlataforma {

  L6_PLATAFORMA: any;
  PLATAFORMA: any;

     constructor(L6_PLATAFORMA: any, PLATAFORMA: any){
         this.L6_PLATAFORMA = L6_PLATAFORMA;
         this.PLATAFORMA = PLATAFORMA;
     }

 };

 export class filtroReportes {

     tipo: string;
     usuario: string;
     plataforma: string;
     fecha_inicio: Date;
     fecha_fin: Date;

     constructor(tipo: string, usuario: string, plataforma: string, fecha_inicio: Date, fecha_fin: Date){
         this.tipo = tipo;
         this.usuario = usuario;
         this.plataforma = plataforma;
         this.fecha_inicio = fecha_inicio;
         this.fecha_fin = fecha_fin;
     }

 };

 export class reportePerfil {

  id: any;
  l6: any;
  l3: any;

  constructor(id: string, l6: string, l3: string){
      this.id = id;
      this.l6 = l6;
      this.l3 = l3;
  }

};

export class envioEmail {

  asunto: any;
  email: any;
  mensaje: any;

  constructor(asunto: string, email: string, mensaje: string){
      this.asunto = asunto;
      this.email = email;
      this.mensaje = mensaje;
  }

};
