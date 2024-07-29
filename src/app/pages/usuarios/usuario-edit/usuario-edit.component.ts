import { Component } from '@angular/core';
import { Usuario } from '../../../models/model.usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { DialogService } from '../../../services/dialogs/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.scss'
})
export class UsuarioEditComponent {
  
  Usuario:Usuario;

  constructor(private activateRoute:ActivatedRoute, private usuariosService:UsuariosService, private router:Router
    ,private dialogs:DialogService, private dialog:MatDialog)
    {
    this.Usuario = new Usuario();

    const id: string | null = this.activateRoute.snapshot.paramMap.get('id');
    
    this.usuariosService.getById(Number(id)).subscribe({
      next: (json:Usuario) => {
        this.Usuario = json;
      },
      error: (json:any) => {
        this.dialogs.exibirMensagemRedirecionar("Aviso!", json.status, "/usuarios");
      }
    })
  }

  alterar(): void{
    this.usuariosService.put(this.Usuario).subscribe({
      next: (json:Usuario) => {
        this.dialogs.exibirMensagemRedirecionar("Aviso!", `Usuario ${this.Usuario.Nome} alterado com sucesso.`, "/usuarios");
    },
    error: (json:any) => {
      this.dialogs.exibirMensagem("Aviso!", json.status);
    }
    })
  }

  desejaExcluir():void{
    const dialogRef = this.dialog.open(ConfirmComponent, 
      {data:{mensagem:`Deseja excluir o Usuário: ${this.Usuario.Nome}?`, titulo:"Exclusão"}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.usuariosService.delete(this.Usuario.Id).subscribe({
          next: () => {
            this.dialogs.exibirMensagemRedirecionar("Exclusão",`Usuário ${this.Usuario.Nome} excluído com sucesso`, "/usuarios");
          },
          error: (jsonErro: any) => {
            this.dialogs.exibirMensagemErro(jsonErro.status, "/usuarios");
          }            
        }); 
      }
    });
  }
}
