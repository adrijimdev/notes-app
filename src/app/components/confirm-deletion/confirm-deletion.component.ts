import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'confirm-deletion',
  imports: [MatDialogModule, MatButtonModule, MatIcon],
  templateUrl: './confirm-deletion.component.html',
  styleUrl: './confirm-deletion.component.css'
})
export class ConfirmDeletionComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDeletionComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
