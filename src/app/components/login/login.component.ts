import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user';

@Component({
  selector: 'login',
  imports: [MatFormFieldModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userModel: UserModel = {
    username: '',
    password: '',
  };

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  login() {
    this.usersService.login(this.userModel).subscribe(
      (response: any) => {
        // almaceno en localStorage el token proporcionado por la api y el id del usuario (necesario para gestionar sus notas)
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);

        // una vez logeado, se redirige al usuario a su lista de notas donde podra crearlas, modificarlas y eliminarlas
        this.router.navigate(['/notes-list']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
