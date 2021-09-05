import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NoPageFoundComponent } from '../shared/no-page-found/no-page-found.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashBoardComponent,
        data: {titulo: 'Dashboard', descrip: 'Esto es la pagina principal'}
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        data: {titulo: 'Details', descrip: 'Esto es la pagina de detalles'}
      },
      { path: '**', redirectTo: 'dashboard' },
      // { path: '**', component: NoPageFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
