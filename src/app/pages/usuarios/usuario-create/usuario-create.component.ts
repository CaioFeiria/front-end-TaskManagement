import { Component } from '@angular/core';
import { Usuario } from '../../../models/model.usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { DialogService } from '../../../services/dialogs/dialog.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.scss'
})
export class UsuarioCreateComponent {

  Usuario:Usuario;

  constructor(private usuariosService:UsuariosService, private router:Router, private dialogs:DialogService){
    this.Usuario = new Usuario();
  }

  enviar() :void{
    this.usuariosService.post(this.Usuario).subscribe({
      next: (json:Usuario) => {
        this.dialogs.exibirMensagemRedirecionar("Novo Usuário", "Usuário cadastrado com sucesso.", "/usuarios");
      },
      error: (json:any) => {
        this.dialogs.exibirMensagem("Aviso!", json.status);
      }
    })
  }

  validarDadosExibirMensagem():boolean {
    let msg:string = '';

    if (this.Usuario.Nome === '') {
        msg += 'Nome;\n';
    }
    
    if (this.Usuario.Email === '') {
        msg += 'Email;\n';
    }
    
    if (this.Usuario.Cargo === '') {
        msg += 'Cargo.';
    }
    
    if (msg !== '') {
        msg = 'Preencha corretamente os dados a seguir:\n' + msg;
        this.dialogs.exibirMensagem("Aviso!", msg);
        return false;
    }

    return true;
}
}
