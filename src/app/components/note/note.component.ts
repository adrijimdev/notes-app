import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesService } from '../../services/notes.service';
import { NoteModel } from '../../models/note';

@Component({
  selector: 'note',
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() noteModel!: NoteModel;
  @Output() noteDeleted: EventEmitter<void> = new EventEmitter();

  constructor(private notesService: NotesService) {}

  deleteNote() {
    if(this.noteModel._id) { // Comprobación necesaria, pues sin ella hay un error ya que la id podría ser undefined al llamar a la función de eliminado
        this.notesService.deleteNote(this.noteModel._id).subscribe({
          next: (deletedNote) => {
            this.noteDeleted.emit(); // Para notificar al componente notes-list y poder actualizar la lista de notas
          },
          error: (err) => console.error('Error al eliminar la nota:', err)
        });
    } else {
      console.error("No se ha encontrado una nota con ese ID")
    }
  }
}
