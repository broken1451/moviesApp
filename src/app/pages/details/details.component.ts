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

  public movie!: Result;
  public show = false;
  public loading!: boolean;

  constructor(private activateRoute: ActivatedRoute, private location: Location, private movieService: MoviesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.activateRoute.params.pipe(
      switchMap(({id}) => {
        return this.getMovieId(id);
      })
    ).subscribe((res: any) => {
      setTimeout(() => {
        res.visible = false;
        this.movie = res;
        this.loading = false;
      }, 2000);
    });
  }

  public getMovieId(id: string): any {
    return this.movieService.getMovieById(id);
  }

  public back(): void {
    this.location.back();
  }
}
