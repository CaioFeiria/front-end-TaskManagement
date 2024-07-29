import { Component, signal } from '@angular/core';
import { Usuario } from '../../../models/model.usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { DialogService } from '../../../services/dialogs/dialog.service';

@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
  styleUrl: './usuario-index.component.scss'
})
export class UsuarioIndexComponent {

  Usuarios!:Usuario[];
  displayedColumns:string[] = ['Id', 'Nome', 'Email', 'Cargo'];

  Id:number | null;
  Nome:string;
  Cargo:string;

  constructor(private usuariosService:UsuariosService, private dialogs:DialogService){
    this.Id = null;
    this.Nome = '';
    this.Cargo = '';
  }

  definirPesquisa(): void{
    this.Usuarios = [];

    if (this.Id !== null) {
      this.pesquisarPorId(this.Id);
      return;
    }

    if (this.Nome !== '') {
      this.pesquisarPorNome(this.Nome);
      return;
    }

    if (this.Cargo !== '') {
      this.pesquisarPorCargo(this.Cargo);
      return;
    }

    this.pesquisar();
  }

  pesquisar() :void{
    this.usuariosService.getAll().subscribe({
      next: (json:Usuario[]) => {
        this.Usuarios = json;
      },
      error: (json:any) => {
        this.dialogs.exibirMensagem("Aviso!", json.status);
      }
    })
  }
  
  pesquisarPorId(id:number): void{
    this.usuariosService.getById(id).subscribe({
      next: (json:Usuario) => {
        this.Usuarios = [json];
      },
      error: (json:any) => {
        this.dialogs.exibirMensagem("Aviso!", json.status);
      }
    })
  }

  pesquisarPorNome(nome:string): void{
    this.usuariosService.getByNome(nome).subscribe({
      next: (json:Usuario[]) => {
        this.Usuarios = json;
      },
      error: (json:any) => {
        this.dialogs.exibirMensagem("Aviso!", json.status);
      }
    })
  }

  pesquisarPorCargo(cargo:string): void{
    this.usuariosService.getByCargo(cargo).subscribe({
      next: (json:Usuario[]) => {
        this.Usuarios = json;
      },
      error: (json:any) => {
        this.dialogs.exibirMensagem("Aviso!", json.status);
      }
    })
  }

  limparCampos(): void{
    this.Id = null;
    this.Nome = '';
    this.Cargo = '';
  }
}

  


