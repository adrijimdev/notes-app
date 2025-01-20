import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { NotesService } from '../../services/notes.service';
import { NoteModel } from '../../models/note';

import { ConfirmDeletionComponent } from '../confirm-deletion/confirm-deletion.component';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { NoteInfoComponent } from '../note-info/note-info.component';

@Component({
  selector: 'note-card',
  imports: [CommonModule, MatIcon, MatDialogActions, MatButtonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  @Input() noteModel!: NoteModel;
  @Output() noteDeleted: EventEmitter<void> = new EventEmitter();
  @Output() noteUpdated: EventEmitter<void> = new EventEmitter();

  constructor(private notesService: NotesService, private dialog: MatDialog ) {}

  deleteNote() {
    // Se ejecuta el componente confirm-deletion como modal
    const dialogRef = this.dialog.open(ConfirmDeletionComponent);

    // Se comprueba si en el modal se ha confirmado el eliminado y entonces se procede con él
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.noteModel._id) {
          this.notesService.deleteNote(this.noteModel._id).subscribe({
            next: () => {
              this.noteDeleted.emit();
            },
            error: (err) => console.error('Error al eliminar la nota:', err),
          });
        }
      }
    });
  }

  updateNote() {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      data: this.noteModel,
    }); // Para abrir el modal de edición

    dialogRef.afterClosed().subscribe((updatedNote) => {
      if (updatedNote) {
        if (this.noteModel._id) {
          this.notesService.updateNote(this.noteModel._id, updatedNote).subscribe({
            next: () => {
              this.noteUpdated.emit();
            },
            error: (err) => console.error('Error al modificar la nota:', err),
          });
        }
      }
    });
  }

  openNoteInfo() {
    const dialogRef = this.dialog.open(NoteInfoComponent, {
      data: this.noteModel,
    });
  }

}
