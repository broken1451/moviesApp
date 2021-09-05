import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovieResponse, Result } from '../models/movie.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  public getPopulares(page: string | number) {
     try {
      return this.httpClient.get<MovieResponse>(`${environment.baseUrl}/discover/movie?api_key=${environment.api_key}&page=${page}`).pipe(
        map(moviesPopular => {
          return moviesPopular;
        })
      )
     } catch (error) {
         console.log(error);
     }
  }

  public getMovieById(id: string) {
    // https://api.themoviedb.org/3/movie/675445?api_key=8ee813186f1978b4c769a17cf5c144ab
    try {
      return this.httpClient.get<any>(`${environment.baseUrl}/movie/${id}?api_key=${environment.api_key}`).pipe(
        map(movieId => {
          return movieId;
        })
      )
     } catch (error) {
         console.log(error);
     }
  }
}
