import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';

@Component({
  selector: 'notes-list',
  imports: [CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {
  notesList: Note[] = []

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notesService.getNotes().subscribe({
      next: (data) => this.notesList = data,
      error: (err) => console.error('Error al obtener notas:', err)
    });
  }



  bringNotes() {
    fetch(`http://localhost:3000/notes/`)
    .then(res => res.json())
    .then()
  }



}
