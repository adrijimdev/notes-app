import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user';

@Component({
  selector: 'login',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userModel: UserModel = {
    username: '',
    password: '',
  };

  constructor(private usersService: UsersService, private router: Router) {}

  login() {
    this.usersService.login(this.userModel).subscribe(
      (response: any) => {
        // almaceno en localStorage el id del usuario (necesario para gestionar sus notas)
        localStorage.setItem('userId', response.userId);

        // una vez logeado, se redirige al usuario a su lista de notas donde podra crearlas, modificarlas y eliminarlas
        this.router.navigate(['/notes-list']);
      },
      (error) => {
        if (error.name === 'TimeoutError') {
          alert('La solicitud tardó demasiado en responder debido a que el backend está alojado con el tier gratuito de Render. Por favor, inténtalo de nuevo.');
        } else {
          alert('Usuario o contraseña incorrectos o la solicitud tardó demasiado en responder. Por favor, inténtalo de nuevo.');
        }
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}
