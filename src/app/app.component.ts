import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'notes-app';
  constructor(private router: Router) {}

  logOut() {
    localStorage.setItem('userId', '')
    localStorage.setItem('token', '')

    //al no haber una sesión iniciada, nos envía al componente login-or-register donde podremos iniciar sesión o crear una cuenta
    this.router.navigate(['/login-or-register'])
  }

}
