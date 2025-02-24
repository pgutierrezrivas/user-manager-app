import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient = inject(HttpClient); // inyeccion de dependencias httpClient
  private baseUrl: string = "https://peticiones.online/api/users"; // elemento que me va a permitir hacer las peticiones

  constructor() { }

  // GET
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl); // todo esto hace la llamada y devuelve un observable
  }

  getById(_id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${_id}`); // recibo el id y le paso la ruta de la que tiene que hacer el id
  }

  // POST
  insert(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, user);
  }

  // PUT
  update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/${user._id}`, user);
  }

  // DELETE
  delete(_id: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.baseUrl}/${_id}`); // recibo el id y le paso la ruta de la que tiene que hacer el id
  }

}