import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { NotesService } from '../../services/notes.service';
import { NoteModel } from '../../models/note';

import { ConfirmDeletionComponent } from '../confirm-deletion/confirm-deletion.component';

@Component({
  selector: 'note',
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() noteModel!: NoteModel;
  @Output() noteDeleted: EventEmitter<void> = new EventEmitter();

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

}
