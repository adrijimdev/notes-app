import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogContent, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { NoteModel } from '../../models/note';

@Component({
  selector: 'update-note',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatFormFieldModule, FormsModule],
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
