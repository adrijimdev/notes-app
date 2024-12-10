import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteModel } from '../../models/note';

@Component({
  selector: 'note',
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() noteModel!: NoteModel;
}
