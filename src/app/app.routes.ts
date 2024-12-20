import { Routes } from '@angular/router';

import { authGuard } from './auth.guard';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LoginOrRegisterComponent } from './components/login-or-register/login-or-register.component';

export const routes: Routes = [
  {path: 'notes-list', component: NotesListComponent, canActivate: [authGuard],},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login-or-register', component: LoginOrRegisterComponent},
  { path: '', redirectTo: '/login-or-register', pathMatch: 'full' }
];
