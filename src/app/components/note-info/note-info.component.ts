import { Component, Inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDialogRef, MatDialogContent, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { NoteModel } from '../../models/note';

@Component({
  selector: 'note-info',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatIcon],
  templateUrl: './note-info.component.html',
  styleUrl: './note-info.component.css',
})
export class NoteInfoComponent {
  noteModel: NoteModel;
  updatingNote: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<NoteInfoComponent>,
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
