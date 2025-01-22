import { Component, NgModule } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIcon, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'notes-app';
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    if (localStorage.getItem('userId') === "") {
      return true
    } else {
        return false;
      }
    }

  logOut() {
    localStorage.setItem('userId', '')
    localStorage.setItem('token', '')

    //al no haber una sesión iniciada, nos envía al componente login-or-register donde podremos iniciar sesión o crear una cuenta
    this.router.navigate(['/login-or-register'])
  }

  goToFrontRep() {
    const newWindow = window.open("https://github.com/adrijimdev/notes-app", "_blank");
    if (newWindow) {
      newWindow.focus();
    }
  }

  goToBackRep() {
    const newWindow = window.open("https://github.com/adrijimdev/notes-api-nodejs", "_blank");
    if (newWindow) {
      newWindow.focus();
    }
  }

}
