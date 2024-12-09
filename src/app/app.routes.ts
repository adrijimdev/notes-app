import { Routes } from '@angular/router';
import { NotesListComponent } from './components/notes-list/notes-list.component';

export const routes: Routes = [
  {path: 'notes-list', component: NotesListComponent},
  { path: '', redirectTo: '/notes-list', pathMatch: 'full' }
];
