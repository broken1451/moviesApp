import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Result, MovieResponse } from '../models/movie.interface';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public peliSerched: any = [];
  public conteo: any = 9;
  public page = 1;
  public textoSearched!: string;
  public loading!: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router, private movieService: MoviesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe(({termino}) => {
      this.buscarPelicula(termino, String(this.page));
    });
  }

  async buscarPelicula(texto: string, page = '1'): Promise<void> {
   const text = texto.trim();
   this.textoSearched = text;
   this.loading = true;
   setTimeout(async () => {
     const resp = await this.movieService.searchMovie(text, page)?.toPromise();
     resp?.results?.map((result: any) => result.visible = false);
     this.peliSerched = resp?.results?.slice(0, this.conteo);
     this.loading = false;
   }, 2000);
  }

  previous(numb: number): void{
    this.page = this.page + numb;
    if (this.page === 0) {
      this.page = 1;
      return;
    }
    this.buscarPelicula(this.textoSearched, String(this.page));
  }

  next(num: number): void{
    this.page = this.page + num;
    if (this.page >= 27) {
      this.page = 26;
      console.log(this.page);
      return;
    }
    this.buscarPelicula(this.textoSearched, String(this.page));
  }
}
