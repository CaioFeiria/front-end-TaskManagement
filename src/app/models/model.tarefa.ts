export class Tarefa{
    Id!:number;
    Titulo:string;
    Descricao!:string | null;
    Prazo:Date;
    Prioridade:boolean;
    Estado:boolean;
    Id_responsavel!:number;

    constructor(){
        this.Titulo = '';
        this.Prazo = new Date();
        this.Prioridade = false;
        this.Estado = false;
    }
}