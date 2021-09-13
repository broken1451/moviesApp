import { Component, OnInit } from '@angular/core';
import { Result } from '../models/movies.playing';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-now-playinng',
  templateUrl: './now-playinng.component.html',
  styleUrls: ['./now-playinng.component.scss'],
})
export class NowPlayinngComponent implements OnInit {
  public moviesPopulares: Result[] = [];
  public peliPlaying: any[] = [];
  public moviePlaying: any[] = [];
  public conteo = 9;
  public show = false;
  public page = 1;
  public peli: any;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.peli = JSON.parse(localStorage.getItem('favorites')!);
    this.getMoviesPlaying();
  }

  async getMoviesPlaying(page = '1'): Promise<void> {
    try {
      console.log(this.movieService.moviesLocalStorage);
      const resp = await this.movieService.nowPlaying(page)?.toPromise();
      resp?.results?.map((result: Result) => (result.visible = false));
      resp?.results?.map((result: Result) => (result.favorite = false));
      this.moviesPopulares = resp?.results?.slice(0, this.conteo);
      this.peliPlaying = this.moviesPopulares;
      // this.peliPlaying = JSON.parse(localStorage.getItem('favorites')!);
      // console.log({pelis:  this.peliPlaying})
      //   this.peliPlaying = JSON.parse(localStorage.getItem('favorites')!);
      // } else {
      //   this.peliPlaying = this.moviesPopulares;
      // }
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
    this.getMoviesPlaying(String(this.page));
  }

  next(num: number): void {
    this.page = this.page + num;
    if (this.page >= 69) {
      this.page = 68;
      return;
    }
    console.log({ page: this.page, num });
    this.getMoviesPlaying(String(this.page));

    // if ( localStorage.getItem('favorites')) {
    //   this.peliPlaying = JSON.parse(localStorage.getItem('favorites')!);
    //   return;
    // }
    //   console.log('hereeee if');
    //   console.log(JSON.parse(localStorage.getItem('favorites')!));
    //   // this.peliPlaying = JSON.parse(localStorage.getItem('favorites')!);
    // } else{
    //   console.log('hereeee');
    //   return;
    // }
  }

  addFavorite(peli: Result): void {
    peli.favorite = !peli.favorite;
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
      let movieLSfav = JSON.parse(localStorage.getItem('favorites') || '');
      const filterMovFav = movieLSfav.filter((pe: any) => pe.favorite === true);
      console.log({ filterMovFav });
      localStorage.setItem('favorites', JSON.stringify(filterMovFav));
    } else {
      let arrMovies = this.peliPlaying.filter(
        (pelicula) => pelicula.favorite === true
      );
      this.movieService._MOVIESlOCALSTORAGE = arrMovies;
      this.saveFavoritos(arrMovies);
      // console.log( this.movieService.moviesLocalStorage)
      localStorage.setItem('favorites', JSON.stringify(arrMovies));
      // sessionStorage.setItem('favorites', JSON.stringify(arrMovies));
    }
  }

  saveFavoritos(data: any) {
    let moviesFav = data;
    console.log({ moviesFav });
  }
}
