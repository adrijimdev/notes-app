import { Routes } from '@angular/router';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {path: 'notes-list', component: NotesListComponent},
  {path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];
