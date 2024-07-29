import { Component } from '@angular/core';
import { Tarefa } from '../../../models/model.tarefa';
import { TarefasService } from '../../../services/tarefas.service';
import { Usuario } from '../../../models/model.usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { DateAdapter } from '@angular/material/core';
import { DialogService } from '../../../services/dialogs/dialog.service';

@Component({
  selector: 'app-tarefa-index',
  templateUrl: './tarefa-index.component.html',
  styleUrl: './tarefa-index.component.scss'
})
export class TarefaIndexComponent {

  Tarefas:Tarefa[];
  Usuarios:Usuario[];

  Id:number | null;
  Titulo:string;
  Data!:Date;

  constructor(private tarefasService:TarefasService, private usuariosService:UsuariosService, 
    private dataAdpter:DateAdapter<Date>, private dialogs:DialogService)
  {
    this.Tarefas = [];
    this.Usuarios = [];
    this.Id = null;
    this.Titulo = '';
    this.dataAdpter.setLocale("pt-BR");
  }

  ngOnInit(): void{
    this.listar();
  }

  definirPesquisa(): void{
    this.Tarefas = [];

    if (this.Id !== null) {
      this.pesquisarPorId(this.Id);
      return;
    }

    if (this.Titulo !== '') {
      this.pesquisarPorTitulo(this.Titulo);
      return;
    }

    if (this.Data !== undefined) {
      this.pesquisarPorData(this.Data);
      return;
    }

    this.Reload();
  }

  listar(): void{
    this.tarefasService.getAll().subscribe({
      next: (jsonTarefas:Tarefa[]) => {
        this.Tarefas = jsonTarefas;
      },
      error: (jsonErro: any) => {
        this.dialogs.exibirMensagem("Aviso!", jsonErro.status);
      }
    })
    this.usuariosService.getAll().subscribe({
      next: (jsonUsuario:Usuario[]) => {
        this.Usuarios = jsonUsuario;
      },
      error: (jsonErro: any) => {
        this.dialogs.exibirMensagem("Aviso!", jsonErro.status);
      }
    })
  }

  pesquisarPorId(Id:number) :void{
    this.tarefasService.getById(Number(Id)).subscribe({
      next: (jsonTarefas:Tarefa) => {
        this.Tarefas = [jsonTarefas];
      },
      error: (jsonErro: any) => {
        this.dialogs.exibirMensagem("Aviso!", jsonErro.status);
      }
    })
  }

  pesquisarPorTitulo(Titulo:string): void{
    this.tarefasService.getByTitulo(Titulo).subscribe({
      next: (jsonTarefas:Tarefa[]) => {
        this.Tarefas = jsonTarefas;
        if (this.Tarefas.length === 0) 
          this.dialogs.exibirMensagem("Aviso!", "404");;
      },
      error: (jsonErro: any) => {
        this.dialogs.exibirMensagem("Aviso!", jsonErro.status);
      }
    })
  }

  pesquisarPorData(data:Date) :void{
    this.tarefasService.getByPrazo(data).subscribe({
      next: (jsonTarefas:Tarefa[]) => {
        this.Tarefas = jsonTarefas;
      },
      error: (jsonErro: any) => {
        this.dialogs.exibirMensagem("Aviso!", jsonErro.status);
      }
    })
  }

  Reload(): void{
    location.reload();
  }
}
