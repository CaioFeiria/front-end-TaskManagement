import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioIndexComponent } from './pages/usuarios/usuario-index/usuario-index.component';
import { Message404Component } from './pages/message404/message404.component';
import { UsuarioCreateComponent } from './pages/usuarios/usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './pages/usuarios/usuario-edit/usuario-edit.component';
import { TarefaIndexComponent } from './pages/tarefas/tarefa-index/tarefa-index.component';
import { TarefaCreateComponent } from './pages/tarefas/tarefa-create/tarefa-create.component';
import { TarefaEditComponent } from './pages/tarefas/tarefa-edit/tarefa-edit.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'usuarios', component:UsuarioIndexComponent},
  {path:'usuarios/create', component:UsuarioCreateComponent},
  {path:'usuarios/edit/:id', component:UsuarioEditComponent},
  {path:'tarefas', component:TarefaIndexComponent},
  {path:'tarefas/create', component:TarefaCreateComponent},
  {path:'tarefas/edit/:id', component:TarefaEditComponent},
  {path:'**', component:Message404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
