import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioIndexComponent } from './pages/usuarios/usuario-index/usuario-index.component';
import { UsuarioCreateComponent } from './pages/usuarios/usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './pages/usuarios/usuario-edit/usuario-edit.component';
import { Message404Component } from './pages/message404/message404.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './shared/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './shared/footer/footer.component';
import { ContainerComponent } from './shared/container/container.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TarefaIndexComponent } from './pages/tarefas/tarefa-index/tarefa-index.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { TarefaCreateComponent } from './pages/tarefas/tarefa-create/tarefa-create.component';
import { TarefaEditComponent } from './pages/tarefas/tarefa-edit/tarefa-edit.component';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AlertComponent } from './shared/dialogs/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './shared/dialogs/confirm/confirm.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuarioIndexComponent,
    UsuarioCreateComponent,
    UsuarioEditComponent,
    Message404Component,
    MenuComponent,
    FooterComponent,
    ContainerComponent,
    TarefaIndexComponent,
    TarefaCreateComponent,
    TarefaEditComponent,
    AlertComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatDividerModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
