export class Plataforma {
  [x: string]: any|string;
      _id?: string;
      n_plataforma: string;
      l6_plataforma: [Number];
      consultas: any;
      requerimientos: any;
      problemas: any;
      userCreate: string


      constructor(_id: string, n_plataforma: string, l6_plataforma: [Number], consultas: any, requerimientos: any, problemas: any, userCreate: string){
        this._id = _id;
          this.n_plataforma = n_plataforma;
          this.l6_plataforma = l6_plataforma;
          this.consultas = consultas;
          this.requerimientos = requerimientos;
          this.problemas = problemas;
          this.userCreate = userCreate;
      }
  };

  export class ListaReason {
        reason: string;
        result: string;

        constructor(reason: string, result: string){
            this.reason = reason;
            this.result = result;

        }
    };
