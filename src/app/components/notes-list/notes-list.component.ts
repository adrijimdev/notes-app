import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotesService } from '../../services/notes.service';
import { NoteModel } from '../../models/note';
import { NoteComponent } from "../note/note.component";

@Component({
  selector: 'notes-list',
  imports: [CommonModule, FormsModule, NoteComponent],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {
  notesList: NoteModel[] = []
  noteToCreate: NoteModel = new NoteModel("", "")

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.bringNotes()
  }

  createNote() {
    this.notesService.createNote(this.noteToCreate).subscribe({
      next: (createdNote) => {
        this.noteToCreate = new NoteModel("", "");  // Para limpiar el formulario, aunque en el futuro no será necesario ya que se hará de otro modo
        this.bringNotes(); //Actualizo la lista de notas
      },
      error: (err) => console.error('Error al crear nota:', err)
    });
  }

  bringNotes() {
    this.notesService.getNotes().subscribe({
      next: (data) => this.notesList = data,
      error: (err) => console.error('Error al obtener notas:', err)
    });
  }

}
