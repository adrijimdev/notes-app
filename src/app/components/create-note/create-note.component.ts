import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogContent, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { NoteModel } from '../../models/note';

@Component({
  selector: 'create-note',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatFormFieldModule, FormsModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css',
})
export class CreateNoteComponent {
  noteModel: NoteModel;

  constructor(
    private dialogRef: MatDialogRef<CreateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteModel // Se inyectan los datos del componente padre (note-component)
  ) {
    const userId = localStorage.getItem('userId');
    this.noteModel = { ...data, userId : userId || ''}; // Se crea una copia del objeto data y se le añade el userId
  }

  createNote(): void {
    this.dialogRef.close(this.noteModel);
  }

  cancelCreation(): void {
    this.dialogRef.close();
  }
}
