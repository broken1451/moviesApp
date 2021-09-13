import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MovieResponse, Result } from '../models/movie.interface';

@Component({
  selector: 'app-populars',
  templateUrl: './populars.component.html',
  styleUrls: ['./populars.component.scss']
})
export class PopularsComponent implements OnInit {

  public moviesPopulares: Result[] = [];
  public peliPopulares: Result[] = [];
  public conteo = 9;
  public show = false;
  public page = 1;

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.getPopulares();
  }


  async getPopulares( page = '1'): Promise<void> {
    try {
      const resp = await this.movieService.getPopulars(page)?.toPromise();
      resp?.results?.map((result: Result) => result.visible = false)
      this.moviesPopulares = resp?.results?.slice(0, this.conteo);
      this.peliPopulares = this.moviesPopulares;
    } catch (error) {
      console.log(error);
    }
  }

  previous(numb: number): void{
    this.page = this.page + numb;
    if (this.page === 0) {
      this.page = 1;
      return;
    }
    this.getPopulares(String(this.page));
  }

  next(num: number): void{
    this.page = this.page + num;
    if (this.page >= 500) {
      this.page = 500;
      return;
    }
    this.getPopulares(String(this.page));
  }

}
