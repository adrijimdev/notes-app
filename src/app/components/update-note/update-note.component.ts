import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogContent, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


import { NoteModel } from '../../models/note';

@Component({
  selector: 'update-note',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatIcon],
  templateUrl: './update-note.component.html',
  styleUrl: './update-note.component.css',
})
export class UpdateNoteComponent {
  noteModel: NoteModel;

  constructor(
    private dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteModel
  ) {
    this.noteModel = { ...data };
  }

  updateNote(): void {
    this.dialogRef.close(this.noteModel);
  }

  cancelUpdate(): void {
    this.dialogRef.close();
  }
}
