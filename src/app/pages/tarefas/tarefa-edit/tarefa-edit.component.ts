import { Component } from '@angular/core';
import { Tarefa } from '../../../models/model.tarefa';
import { TarefasService } from '../../../services/tarefas.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/model.usuario';
import { DateAdapter } from '@angular/material/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { DialogService } from '../../../services/dialogs/dialog.service';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tarefa-edit',
  templateUrl: './tarefa-edit.component.html',
  styleUrl: './tarefa-edit.component.scss'
})
export class TarefaEditComponent {
  
  Tarefa:Tarefa;
  Usuarios:Usuario[];

  constructor(private activateRoute:ActivatedRoute, private tarefasServices:TarefasService, 
    private usuariosService:UsuariosService, private dialogs:DialogService, private dialog:MatDialog,
    private dataAdapter:DateAdapter<Date>)
    {
    this.Tarefa = new Tarefa();
    this.Usuarios = [];
    this.dataAdapter.setLocale("pt-BR");

    const id: string | null = this.activateRoute.snapshot.paramMap.get('id');
    
    this.usuariosService.getAll().subscribe({
      next: (jsonUsuario:Usuario[]) => {
        this.Usuarios = jsonUsuario;
      },
      error: (json:any) => {
        this.dialogs.exibirMensagem("Aviso!", json.status);
      }
    })

    this.tarefasServices.getById(Number(id)).subscribe({
      next: (json:Tarefa) => {
        this.Tarefa = json;
      },
      error: (json:any) => {
        this.dialogs.exibirMensagemRedirecionar("Aviso!", json.status, "/tarefas");
      }
    })
  }

  alterar(): void{
    this.tarefasServices.put(this.Tarefa).subscribe({
      next: (json:Tarefa) => {
        this.dialogs.exibirMensagemRedirecionar("Edição Tarefa", `A terafa ${this.Tarefa.Titulo} foi alterada com sucesso.`
          , "/tarefas");
    },
    error: (json:any) => {
      this.dialogs.exibirMensagem("Aviso!", json.status);
    }
    })
  }

  desejaExcluir():void{
    const dialogRef = this.dialog.open(ConfirmComponent, 
      {data:{mensagem:`Deseja excluir a Tarefa: ${this.Tarefa.Titulo}?`, titulo:"Exclusão"}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.tarefasServices.delete(this.Tarefa.Id)
        .subscribe({
          next: () => {
            this.dialogs.exibirMensagemRedirecionar("Exclusão",`Tarefa ${this.Tarefa.Titulo} excluída com sucesso`, "/tarefas");
          },
          error: (jsonErro: any) => {
            this.dialogs.exibirMensagemErro(jsonErro.status, "/tarefas");
          }            
        }); 
      }
    });
  }
}