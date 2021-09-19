import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NoPageFoundComponent } from '../shared/no-page-found/no-page-found.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { PopularsComponent } from './populars/populars.component';
import { NowPlayinngComponent } from './now-playinng/now-playinng.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { TopRatedComponent } from './top-rated/top-rated.component';

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
      {
        path: 'search/:termino',
        component: SearchComponent,
        data: {titulo: 'Search', descrip: 'Esto es la pagina de busqueda'}
      },
      {
        path: 'pupulars',
        component: PopularsComponent,
        data: {titulo: 'Popular', descrip: 'Esto es la pagina de Populares'}
      },
      {
        path: 'now-playing',
        component: NowPlayinngComponent,
        data: {titulo: 'Now Playing', descrip: 'Esto es la pagina de Populares'}
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        data: {titulo: 'Favorites', descrip: 'Esto es la pagina de Favoritos'}
      },
      {
        path: 'top-rated',
        component: TopRatedComponent,
        data: {titulo: 'Top-Rated', descrip: 'Esto es la pagina de Valorados'}
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
