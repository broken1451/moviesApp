import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovieResponse, Result } from '../models/movie.interface';
import { Observable } from 'rxjs';
import { MoviePlayingResponse } from '../models/movies.playing';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public _MOVIESlOCALSTORAGE!: any[];
  public movieStoraged!: any[];


  constructor(private httpClient: HttpClient) {
    this.cargarStorage();
  }

  public get moviesLocalStorage(): any{
    return {...this._MOVIESlOCALSTORAGE};
  }

  set MOVIESlOCAL(value: any) {
    this._MOVIESlOCALSTORAGE = value;
  }


  public getPopulares(page: string | number) {
     try {
      const params = new HttpParams()
      .set('api_key', String(environment.api_key))
      .set('page', String(page));
      return this.httpClient.get<MovieResponse>(`${environment.baseUrl}/discover/movie`, {params}).pipe(
        map(moviesPopular => {
          return moviesPopular;
        })
      )
     } catch (error) {
         console.log(error);
     }
  }

  public getMovieById(id: string) {
    try {
      const params = new HttpParams().set('api_key', String(environment.api_key));
      return this.httpClient.get<any>(`${environment.baseUrl}/movie/${id}`, {params}).pipe(
        map(movieId => {
          return movieId;
        })
      );
     } catch (error) {
         console.log(error);
     }
  }

  public searchMovie(texto: string, page: string | number): any {
    try {
      const params = new HttpParams()
      .set('api_key', String(environment.api_key))
      .set('query', String(texto))
      .set('page', String(page));
      // `${environment.baseUrl}/search/movie?api_key=${environment.api_key}&query=${texto}&page=${page}`)
      // tslint:disable-next-line: max-line-length
      return this.httpClient.get<any>(`${environment.baseUrl}/search/movie`, {params}).pipe(
        map(movieSearched => {
          return movieSearched;
        })
      );
     } catch (error) {
         console.log(error);
     }
  }

  public getPopulars(page: string | number): any {
    try {
      const params = new HttpParams()
      .set('api_key', String(environment.api_key))
      .set('page', String(page));
      // tslint:disable-next-line: max-line-length
      // `${environment.baseUrl}/movie/popular?api_key=${environment.api_key}&language=en-US&page=${page}`)
      return this.httpClient.get<MovieResponse>(`${environment.baseUrl}/movie/popular`, {params}).pipe(
        map(moviesPopulars => {
          return moviesPopulars;
        })
      );
     } catch (error) {
         console.log(error);
     }
  }
  public nowPlaying(page: string | number): any {
    try {
      const params = new HttpParams()
      .set('api_key', String(environment.api_key))
      .set('page', String(page));
      // tslint:disable-next-line: max-line-length
      // `${environment.baseUrl}/movie/now_playing?api_key=${environment.api_key}&language=en-US&page=${page}`)
      return this.httpClient.get<MoviePlayingResponse>(`${environment.baseUrl}/movie/now_playing`, {params}).pipe(
        map(moviesPlaying => {
          return moviesPlaying;
        })
      );
     } catch (error) {
         console.log(error);
     }
  }

  public topRated(page: string | number): any {
    try {
      const params = new HttpParams()
      .set('api_key', String(environment.api_key))
      .set('page', String(page));
      return this.httpClient.get<MovieResponse>(`${environment.baseUrl}/movie/top_rated`, {params}).pipe(
        map(moviesPlaying => {
          return moviesPlaying;
        })
      );
     } catch (error) {
         console.log(error);
     }
  }

  cargarStorage() {
    if (localStorage.getItem('favorites')) {
      this.MOVIESlOCAL = JSON.parse(localStorage.getItem('favorites')!);
    } else {
      this.MOVIESlOCAL = [];
    }
  }

}
