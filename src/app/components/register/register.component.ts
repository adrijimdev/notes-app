import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user';

@Component({
  selector: 'register',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userModel: UserModel = new UserModel('', '');
  constructor(private usersService: UsersService, private router: Router) {}

  registerUser() {
    if (!this.userModel.username || !this.userModel.password) {
      console.error('El nombre de usuario y la contraseña son obligatorios.');
      return;
    }

    this.usersService.createUser(this.userModel).subscribe({
      next: (response) => {
        this.userModel = new UserModel("", ""); // Limpiar los campos del formulario
        console.log('Usuario registrado:', response);
        localStorage.setItem('userId', String(response._id)); // Guardar el id del usuario en el localStorage
        this.router.navigate(['/notes-list']); // Redirigir al usuario a la lista de notas
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
      },
    });
  }
}
