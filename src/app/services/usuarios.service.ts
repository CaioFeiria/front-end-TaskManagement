import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/model.usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient:HttpClient) { }

  getAll() :Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`https://localhost:44382/api/usuarios`);
  }

  getById(id:number) :Observable<Usuario>{
    return this.httpClient.get<Usuario>(`https://localhost:44382/api/usuarios/${id}`);
  }

  getByNome(nome:string) :Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`https://localhost:44382/api/usuarios?nome=${nome}`);
  }

  getByCargo(cargo:string) :Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`https://localhost:44382/api/usuarios?cargo=${cargo}`);
  }

  put(usuario: Usuario) :Observable<Usuario>{
    return this.httpClient.put<Usuario>(`https://localhost:44382/api/usuarios/${usuario.Id}`,usuario);
  }

  post(usuario: Usuario) :Observable<Usuario>{
    return this.httpClient.post<Usuario>(`https://localhost:44382/api/usuarios`,usuario);
  }

  delete(id:number) :Observable<void>{
    return this.httpClient.delete<void>(`https://localhost:44382/api/usuarios/${id}`);
  }
}
