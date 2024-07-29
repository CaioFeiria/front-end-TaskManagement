import { Component, signal } from '@angular/core';
import { Tarefa } from '../../../models/model.tarefa';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { Usuario } from '../../../models/model.usuario';
import { TarefasService } from '../../../services/tarefas.service';
import { DialogService } from '../../../services/dialogs/dialog.service';

@Component({
  selector: 'app-tarefa-create',
  templateUrl: './tarefa-create.component.html',
  styleUrl: './tarefa-create.component.scss'
})
export class TarefaCreateComponent {

  Tarefa:Tarefa;
  Usuarios:Usuario[];

  constructor(private tarefasService:TarefasService, private usuariosService:UsuariosService,
     private router:Router, private dataAdapter:DateAdapter<Date>, private dialogs:DialogService) 
    {
      this.Tarefa = new Tarefa();
      this.Usuarios = [];
      this.dataAdapter.setLocale("pt-BR");
      this.Tarefa.Id_responsavel = 0;

      this.usuariosService.getAll().subscribe({
        next: (jsonUsuario:Usuario[]) => {
          this.Usuarios = jsonUsuario;
        },
        error: (json:any) => {
          this.dialogs.exibirMensagem("Aviso!", json);
        }
      })
  }

  enviar() :void{
    if(this.validarDadosExibirMensagem()){
    this.tarefasService.post(this.Tarefa).subscribe({
      next: () => {
        this.dialogs.exibirMensagemRedirecionar("Nova Tarefa", "Tarefa cadastrada com sucesso.", "/tarefas");
      },
      error: (json:any) => {
        this.dialogs.exibirMensagem("Aviso!", json.status);
        console.log(json.status);
      }
    })
  }
  }

  validarDadosExibirMensagem():boolean {
    let msg:string = '';

    if (this.Tarefa.Titulo === '') {
        msg += 'Titulo;\n';
    }
    
    if (this.Tarefa.Prazo < this.dataAdapter.today()) {
        msg += 'Prazo menor ou igual a data atual;\n';
    }
    
    if (this.Tarefa.Id_responsavel === 0) {
        msg += 'Responsável.';
    }
    
    if (msg !== '') {
        msg = 'Preencha corretamente os dados a seguir:\n' + msg;
        this.dialogs.exibirMensagem("Aviso!", msg);
        return false;
    }

    return true;
}

  limparCampos(): void{
    this.Tarefa.Titulo = '';
    this.Tarefa.Descricao = '';
    this.Tarefa.Prazo = this.dataAdapter.today();
    this.Tarefa.Prioridade = false;
    this.Tarefa.Estado = false;
    this.Tarefa.Id_responsavel = 0;
  }

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
