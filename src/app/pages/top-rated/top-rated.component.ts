import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MoviesService } from '../services/movies.service';
import { Result } from '../models/movie.interface';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {

  public moviesRated: any[] = [];
  public peliRating: any[] = [];
  public conteo = 9;
  public show = false;
  public page = 1;
  public peli: any;
  public favMovie!: boolean | any;
  public loading!: boolean;

  constructor(private movieService: MoviesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-non-null-assertion
    JSON.parse(localStorage.getItem('favoritesRated')!);
    this.loading = true;
    this.getMovieRated(this.favMovie);
  }

  async getMovieRated(page = '1', fav?: boolean): Promise<any> {
    this.loading = true;
    setTimeout(async () => {
      const resp = await this.movieService.topRated(page)?.toPromise();
      resp?.results?.map((result: Result) => (result.visible = false));
      resp?.results?.map((result: Result) => (result.favorite = false));
      if (this.favMovie == false) {
        // tslint:disable-next-line: no-non-null-assertion
        const moviesLocal: any[] = JSON.parse(localStorage.getItem('favoritesRated')!);
        resp?.results?.map((result: Result) => {
          moviesLocal.forEach(peli => {
            if (result.title == peli.title) {
              console.log({result, peli,resp});
              result.favorite = peli.favorite;
              return  result;
            }
          });
        });
      } else if(this.favMovie == undefined){
        // tslint:disable-next-line: no-non-null-assertion
        const moviesLocal: any[] = JSON.parse(localStorage.getItem('favoritesRated')!);
        resp?.results?.map((result: Result) => {
          moviesLocal?.forEach(peli => {
            if (result.title == peli.title) {
              console.log({result, peli,resp});
              result.favorite = peli.favorite;
              return  result;
            }
          });
        });
      }
      this.moviesRated = resp?.results?.slice(0, this.conteo);
      this.loading = false;
      this.peliRating.push(...this.moviesRated);
      return this.peliRating;
    }, 2000);
  }

  previous(numb: number): any {
    this.page = this.page + numb;
    if (this.page === 0) {
      this.page = 1;
      return;
    }
    this.getMovieRated(String(this.page), this.favMovie );
  }

  next(num: number): void {
    this.page = this.page + num;
    if (this.page >= 69) {
      this.page = 68;
      return;
    }
    this.getMovieRated(String(this.page), this.favMovie );
  }



  addFavorite(peli: Result, fav?: boolean): void {
    peli.favorite = !peli.favorite;
    this.favMovie = fav;
    if (!peli.favorite) {
      const peliDeleted: Result[] = JSON.parse(
        localStorage.getItem('favoritesRated') || ''
      );
      peliDeleted.forEach((mov) => {
        if (mov.title === peli.title) {
          mov.favorite = false;
        }
      });
      localStorage.setItem('favoritesRated', JSON.stringify(peliDeleted));
      const movieLSfav = JSON.parse(localStorage.getItem('favoritesRated') || '');
      const filterMovFav = movieLSfav.filter((pe: any) => pe.favorite === true);
      localStorage.setItem('favoritesRated', JSON.stringify(filterMovFav));
      this.toastr.error('Removida de Favoritos', 'Pelicula', {
        positionClass: 'toast-top-right'
      });
    } else {
      const arrMovies = this.peliRating.filter(
        (pelicula) => {
          if (pelicula.favorite === true) {
            return pelicula;
          }
        }
      );
      localStorage.setItem('favoritesRated', JSON.stringify(arrMovies));
      this.toastr.success('Agregada a Favoritos', 'Pelicula', {
        positionClass: 'toast-top-right'
      });
      return;
    }
  }

}
