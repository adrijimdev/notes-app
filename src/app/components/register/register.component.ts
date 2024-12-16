import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user';

@Component({
  selector: 'register',
  imports: [MatFormFieldModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userModel: UserModel = new UserModel('', '');
  constructor(private usersService: UsersService) {}

  registerUser() {
    if (!this.userModel.username || !this.userModel.password) {
      console.error('El nombre de usuario y la contraseña son obligatorios.');
      return;
    }

    this.usersService.createUser(this.userModel).subscribe({
      next: (response) => {
        this.userModel = new UserModel("", "");
        console.log('Usuario registrado:', response);
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
      },
    });
  }
}
