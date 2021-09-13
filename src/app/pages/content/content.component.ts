import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieResponse, Result } from '../models/movie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  public page = 1;
  public peliPopulares: any;
  public populares: any;
  public conteo = 9;
  public show = false;

  constructor(
    private moviePeliculaService: MoviesService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.getPopulares();
  }

  async getPopulares(page = '1'): Promise<void> {
    try {
      const resp = await this.moviePeliculaService
        .getPopulares(page)
        ?.toPromise();
      resp?.results?.map((result) => (result.visible = false));
      this.populares = resp?.results?.slice(0, this.conteo);
      this.peliPopulares = this.populares;
      console.log({ resp: this.peliPopulares });
    } catch (error) {
      console.log(error);
    }
  }

  previous(numb: number): void {
    this.page = this.page + numb;
    if (this.page === 0) {
      this.page = 1;
      return;
    }
    this.getPopulares(String(this.page));
  }

  next(num: number): void {
    this.page = this.page + num;
    if (this.page >= 500) {
      this.page = 500;
      return;
    }
    this.getPopulares(String(this.page));
  }

  goToDetails(peli: Result): void {
    console.log({ peli });
    this.router.navigate(['/movies/details', peli.id]);
  }

  addFavorite(peli: Result): void {
    peli.favorite = !peli.favorite;
    if (!peli.favorite) {
      const peliDeleted: Result[] = JSON.parse(
        localStorage.getItem('favoritesHome') || ''
      );
      peliDeleted.forEach((mov) => {
        if (mov.title === peli.title) {
          mov.favorite = false;
        }
      });
      localStorage.setItem('favoritesHome', JSON.stringify(peliDeleted));
      let movieLSfav = JSON.parse(localStorage.getItem('favorites') || '');
      const filterMovFav = movieLSfav.filter((pe: any) => pe.favorite === true);
      console.log({ filterMovFav });
      localStorage.setItem('favoritesHome', JSON.stringify(filterMovFav));
    } else {
      let arrMovies = this.peliPopulares.filter(
        (pelicula: any) => pelicula.favorite === true
      );
      localStorage.setItem('favoritesHome', JSON.stringify(arrMovies));
      localStorage.getItem('favorites');
    }
  }
}
