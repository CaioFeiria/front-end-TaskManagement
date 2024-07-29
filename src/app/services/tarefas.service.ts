import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/model.tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(private httpClient:HttpClient) { }

  getAll() :Observable<Tarefa[]>{
    return this.httpClient.get<Tarefa[]>(`https://localhost:44382/api/tarefas`);
  }

  getById(id:number) :Observable<Tarefa>{
    return this.httpClient.get<Tarefa>(`https://localhost:44382/api/tarefas/${id}`);
  }

  getByTitulo(titulo:string) :Observable<Tarefa[]>{
    return this.httpClient.get<Tarefa[]>(`https://localhost:44382/api/tarefas?titulo=${titulo}`);
  }

  getByPrazo(prazo:Date) :Observable<Tarefa[]>{
    return this.httpClient.get<Tarefa[]>(`https://localhost:44382/api/tarefas?prazo=${prazo.toDateString()}`);
  }

  put(tarefa: Tarefa) :Observable<Tarefa>{
    return this.httpClient.put<Tarefa>(`https://localhost:44382/api/tarefas/${tarefa.Id}`,tarefa);
  }

  post(tarefa: Tarefa) :Observable<Tarefa>{
    return this.httpClient.post<Tarefa>(`https://localhost:44382/api/tarefas`,tarefa);
  }

  delete(id:number) :Observable<void>{
    return this.httpClient.delete<void>(`https://localhost:44382/api/tarefas/${id}`);
  }
}
