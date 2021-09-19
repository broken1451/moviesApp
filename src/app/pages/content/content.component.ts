import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieResponse, Result } from '../models/movie.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  public page = 1;
  public peliPopulares: any[] = [];
  public populares: any;
  public conteo = 9;
  public show = false;
  public favMovie!: boolean | any;
  public loading!: boolean;

  constructor(
    private moviePeliculaService: MoviesService,
    private router: Router,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    // tslint:disable-next-line: no-non-null-assertion
    JSON.parse(localStorage.getItem('favoritesHome')!);
    this.loading = true;
    this.getPopulares();
  }

  async getPopulares(page = '1'): Promise<any> {
    try {
      this.loading = true;
      setTimeout( async () => {
        const resp = await this.moviePeliculaService.getPopulares(page)?.toPromise();
        resp?.results?.map((result) => (result.visible = false));
        resp?.results?.map((result: Result) => (result.favorite = false));
        if (this.favMovie == false) {
          // tslint:disable-next-line: no-non-null-assertion
          const moviesLocal: any[] = JSON.parse(localStorage.getItem('favoritesHome')!)
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
          const moviesLocal: any[] = JSON.parse(localStorage.getItem('favoritesHome')!)
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
        this.populares = resp?.results?.slice(0, this.conteo);
        this.loading = false;
        this.peliPopulares.push(...this.populares);
        return this.peliPopulares;
      }, 2000);
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

  addFavorite(peli: Result, fav?: boolean): void {
    peli.favorite = !peli.favorite;
    this.favMovie = fav;
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
      const movieLSfav = JSON.parse(localStorage.getItem('favoritesHome') || '');
      const filterMovFav = movieLSfav.filter((pe: any) => pe.favorite === true);
      localStorage.setItem('favoritesHome', JSON.stringify(filterMovFav));
      this.toastr.error('Removida de Favoritos', 'Pelicula', {
        positionClass: 'toast-top-right'
      });
    } else {
      const arrMovies = this.peliPopulares.filter(
        (pelicula) => {
          if (pelicula.favorite === true) {
            return pelicula;
          }
        }
      );
      localStorage.setItem('favoritesHome', JSON.stringify(arrMovies));
      this.toastr.success('Agregada a Favoritos', 'Pelicula', {
        positionClass: 'toast-top-right'
      });
      return;
    }
  }
}
