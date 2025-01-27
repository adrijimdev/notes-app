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
    console.log('Datos enviados para registro:', this.userModel);

    if (!this.userModel.username || !this.userModel.password) {
      console.error('El nombre de usuario y la contraseña son obligatorios.');
      return;
    }

    this.usersService.createUser(this.userModel).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.userModel = new UserModel('', '');  // Limpiar los campos del formulario
        localStorage.setItem('userId', String(response._id));  // Guardar el id del usuario
        this.router.navigate(['/notes-list']);  // Redirigir al usuario
      },
      error: (error) => {
        if (error.name === 'TimeoutError') {
          alert('La solicitud tardó demasiado en responder debido a que el backend está alojado con el tier gratuito de Render. Por favor, inténtalo de nuevo.');
        } else {
          alert('Es posible que el usuario ya exista o la solicitud tardó demasiado en responder. Por favor, inténtalo de nuevo.');
        }
        console.error('Error al registrar el usuario:', error);
      },
    });
  }

}
