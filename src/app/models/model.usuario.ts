export class Usuario{
    Id!:number;
    Nome:string;
    Email:string;
    Senha:string;
    Cargo:string;

    constructor(){
        this.Nome = '';
        this.Email = '';
        this.Senha = '';
        this.Cargo = '';
    }
}