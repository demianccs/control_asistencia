export class User {
  [x: string]: any|string;
  userName: string;
      pass: string;

      constructor(userName: string, pass: string){
          this.userName = userName;
          this.pass = pass;
      }
  };
