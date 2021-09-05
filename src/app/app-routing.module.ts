import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';

const routes: Routes = [
  { path: 'movies',
    component: PagesComponent,
    loadChildren:  () => import('./pages/pages.module').then((m) => m.PagesModule),

  },
  { path: '**', redirectTo:'movies' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
