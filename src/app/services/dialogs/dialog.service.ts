import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../shared/dialogs/alert/alert.component';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../shared/dialogs/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog, private router:Router) { }

  exibirMensagemRedirecionar(titulo:string, msg:string, redirecionar:string):void{
    const dialogRef = this.dialog.open(AlertComponent, 
      {data:{mensagem:msg, titulo:titulo}});

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate([redirecionar]);
    });
  }

  exibirMensagem(titulo:string, msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent, 
      {data:{mensagem:msg, titulo:titulo}});
  }

  exibirMensagemErro(status:number, redirecionar:string): void{
    if (status === 400)
      this.exibirMensagem('Aviso!', 'Verifique os dados enviados.');
    else if (status === 404)
      this.exibirMensagemRedirecionar('Aviso!','Nenhum paciente encontrado', redirecionar);
    else if (status === 500)
      this.exibirMensagem('Aviso!','Erro interno do servidor');
    else if (status === 0)
      this.exibirMensagem('Aviso!', 'Falha na requisição\nEntre em contato com o suporte.');
  }
}
