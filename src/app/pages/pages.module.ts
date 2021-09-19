import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { ImgPipe } from './pipes/img.pipe';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { PopularsComponent } from './populars/populars.component';
import { NowPlayinngComponent } from './now-playinng/now-playinng.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FilterPipe } from './pipes/filtro.pipe';
import { TopRatedComponent } from './top-rated/top-rated.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashBoardComponent,
    HomeComponent,
    ContentComponent,
    ImgPipe,
    FilterPipe,
    DetailsComponent,
    SearchComponent,
    PopularsComponent,
    NowPlayinngComponent,
    FavoritesComponent,
    TopRatedComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
