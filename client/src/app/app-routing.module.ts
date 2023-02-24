import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/start/start.module').then(m => m.StartModule),
    canActivate: [AuthGuard],
    data: {
      pageToAccess: 'auth'
    }
  },
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: 'board',
    loadChildren: () => import('./features/board/board.module').then(m => m.BoardModule),
    canActivate: [AuthGuard],
    data: {
      pageToAccess: 'board'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
