import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { NotesService } from '../../services/notes.service';
import { NoteModel } from '../../models/note';
import { NoteComponent } from "../note/note.component";
import { CreateNoteComponent } from '../create-note/create-note.component';

@Component({
  selector: 'notes-list',
  imports: [CommonModule, FormsModule, NoteComponent],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {
  notesList: NoteModel[] = []
  userId: string = localStorage.getItem('userId')  || ''

  constructor(private notesService: NotesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.bringNotes()
  }

  createNote() {
    const dialogRef = this.dialog.open(CreateNoteComponent);

    dialogRef.afterClosed().subscribe((createdNote) => {
      this.notesService.createNote(createdNote).subscribe({
        next: (createdNote) => {
          this.bringNotes(); //Actualizo la lista de notas
        },
        error: (err) => console.error('Error al crear nota:', err)
      });
    });
  }

  bringNotes() {
    this.notesService.getUserNotes(this.userId).subscribe({
      next: (data) => this.notesList = data, //Se asignan al array las notas obtenidas
      error: (err) => console.error('Error al obtener notas:', err)
    });
  }

}
