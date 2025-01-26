import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `/.netlify/functions/users/`;

  constructor(private http: HttpClient) { }

  // GET ALL
    getUsers(): Observable<UserModel[]> {
      return this.http.get<UserModel[]>(this.apiUrl);
    }

    // GET
    getUserById(id: string): Observable<UserModel> {
      return this.http.get<UserModel>(`${this.apiUrl}/${id}`);
    }

    // POST
    createUser(user: UserModel): Observable<UserModel> {
      return this.http.post<UserModel>(this.apiUrl, user);
    }

    // POST método para iniciar sesión
    login(credentials: { username: string; password: string }): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials);
    }

    // PUT
    updateUser(id: string, user: UserModel): Observable<UserModel> {
      return this.http.put<UserModel>(`${this.apiUrl}/${id}`, user);
    }

    // DELETE
    deleteUser(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
