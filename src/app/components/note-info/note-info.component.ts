import { Component, Inject, NgModule, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDialogContent, MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { NotesService } from '../../services/notes.service';
import { NoteModel } from '../../models/note';
import { ConfirmDeletionComponent } from '../confirm-deletion/confirm-deletion.component';

@Component({
  selector: 'note-info',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatIcon ],
  templateUrl: './note-info.component.html',
  styleUrl: './note-info.component.css',
})
export class NoteInfoComponent {
  noteModel: NoteModel;
  updatingNote: boolean = false;
  @ViewChild('editNoteForm', { static: false }) editNoteForm!: NgForm;
  @Output() noteDeleted: EventEmitter<void> = new EventEmitter();
  @Output() noteUpdated: EventEmitter<NoteModel> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NoteModel,
    private notesService: NotesService,
    private dialogRef: MatDialogRef<NoteInfoComponent>,
    private dialog: MatDialog
    ) {
    this.noteModel = { ...data };
  }

  beginUpdatingNote(): void {
    this.updatingNote = true;
  }

  updateNote() {
    if (this.noteModel) {
      const updatedNote = {
        title: this.noteModel.title,
        content: this.noteModel.content,
        userId: this.noteModel.userId
      };

      if (this.noteModel._id) {
        this.notesService.updateNote(this.noteModel._id, updatedNote).subscribe({
          next: () => {
            this.noteUpdated.emit(updatedNote); // Notificar que la nota fue actualizada
            this.updatingNote = false;
            this.dialogRef.close(updatedNote);
          },
          error: (err) => console.error('Error al modificar la nota:', err),
        });
      }
    }
  }

  deleteNote() {
    const deletedNote = {
      title: this.noteModel.title,
      content: this.noteModel.content,
      userId: this.noteModel.userId
    };
      // Se ejecuta el componente confirm-deletion como modal
      const dialogRef = this.dialog.open(ConfirmDeletionComponent);

      // Se comprueba si en el modal se ha confirmado el eliminado y entonces se procede con él
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if (this.noteModel._id) {
            this.notesService.deleteNote(this.noteModel._id).subscribe({
              next: () => {
                this.noteDeleted.emit();
                this.dialogRef.close(deletedNote);
              },
              error: (err) => console.error('Error al eliminar la nota:', err),
            });
          }
        }
      });
    }

  closeInfo(): void {
    this.dialogRef.close();
  }
}
