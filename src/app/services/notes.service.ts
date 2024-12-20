import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { NoteModel } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private apiUrl = `${environment.apiUrl}/notes`;

  constructor(private http: HttpClient) {}

  // GET ALL
  getNotes(): Observable<NoteModel[]> {
    return this.http.get<NoteModel[]>(this.apiUrl);
  }

  getUserNotes(userId: string): Observable<NoteModel[]> {
    return this.http.get<NoteModel[]>(`${this.apiUrl}/userNotes/${userId}`)
  }

  // GET
  getNoteById(id: string): Observable<NoteModel> {
    return this.http.get<NoteModel>(`${this.apiUrl}/${id}`);
  }

  // POST
  createNote(note: NoteModel): Observable<NoteModel> {
    return this.http.post<NoteModel>(this.apiUrl, note);
  }

  // PUT
  updateNote(id: string, note: NoteModel): Observable<NoteModel> {
    return this.http.put<NoteModel>(`${this.apiUrl}/${id}`, note);
  }

  // DELETE
  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
