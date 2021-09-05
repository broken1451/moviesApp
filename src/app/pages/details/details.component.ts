import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MoviesService } from '../services/movies.service';
import { Observable } from 'rxjs';
import { Result } from '../models/movie.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private location: Location, private movieService: MoviesService) { }

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap(({id}) => {
        return this.getMovieId(id);
      })
    ).subscribe((res) => {
      console.log({res});
    });
  }

  public getMovieId(id: string): any {
    return this.movieService.getMovieById(id);
  }

  public back(): void {
    this.location.back();
  }
}
