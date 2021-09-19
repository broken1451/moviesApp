import { Component, OnInit } from '@angular/core';
import { Result } from '../models/movies.playing';
import { MoviesService } from '../services/movies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-now-playinng',
  templateUrl: './now-playinng.component.html',
  styleUrls: ['./now-playinng.component.scss'],
})
export class NowPlayinngComponent implements OnInit {
  public moviesPopulares: any[] = [];
  public peliPlaying: any[] = [];
  public moviePlaying: any[] = [];
  public conteo = 9;
  public show = false;
  public page = 1;
  public peli: any;
  public favMovie!: boolean | any;
  public loading!: boolean;

  constructor(private movieService: MoviesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    // tslint:disable-next-line: no-non-null-assertion
    JSON.parse(localStorage.getItem('favorites')!);
    this.loading = true;
    this.getMoviesPlaying(this.favMovie);
  }

  async getMoviesPlaying(page = '1', fav?: boolean): Promise<any> {
    try {
      this.loading = true;
      setTimeout(async () => {
        const resp = await this.movieService.nowPlaying(page)?.toPromise();
        resp?.results?.map((result: Result) => (result.visible = false));
        resp?.results?.map((result: Result) => (result.favorite = false));
        if (this.favMovie == false) {
          // tslint:disable-next-line: no-non-null-assertion
          const moviesLocal: any[] = JSON.parse(localStorage.getItem('favorites')!);
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
          const moviesLocal: any[] = JSON.parse(localStorage.getItem('favorites')!);
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
        this.moviesPopulares = resp?.results?.slice(0, this.conteo);
        this.loading = false;
        this.peliPlaying.push(...this.moviesPopulares);
        return this.peliPlaying;
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

   previous(numb: number): any {
    this.page = this.page + numb;
    if (this.page === 0) {
      this.page = 1;
      return;
    }
    this.getMoviesPlaying(String(this.page), this.favMovie );
  }

  next(num: number): void {
    this.page = this.page + num;
    if (this.page >= 69) {
      this.page = 68;
      return;
    }
    this.getMoviesPlaying(String(this.page), this.favMovie );
  }

  addFavorite(peli: Result, fav?: boolean): void {
    peli.favorite = !peli.favorite;
    this.favMovie = fav;
    if (!peli.favorite) {
      const peliDeleted: Result[] = JSON.parse(
        localStorage.getItem('favorites') || ''
      );
      peliDeleted.forEach((mov) => {
        if (mov.title === peli.title) {
          mov.favorite = false;
        }
      });
      localStorage.setItem('favorites', JSON.stringify(peliDeleted));
      const movieLSfav = JSON.parse(localStorage.getItem('favorites') || '');
      const filterMovFav = movieLSfav.filter((pe: any) => pe.favorite === true);
      localStorage.setItem('favorites', JSON.stringify(filterMovFav));
      this.toastr.error('Removida de Favoritos', 'Pelicula', {
        positionClass: 'toast-top-right'
      });
    } else {
      const arrMovies = this.peliPlaying.filter(
        (pelicula) => {
          if (pelicula.favorite === true) {
            return pelicula;
          }
        }
      );
      localStorage.setItem('favorites', JSON.stringify(arrMovies));
      this.toastr.success('Agregada a Favoritos', 'Pelicula',{
        positionClass: 'toast-top-right'
      });
      return;
    }
  }

}
