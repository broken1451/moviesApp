import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Result } from '../models/movie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public movFav: any[] = [];
  public typeFav: any[] = [];
  public form!: FormGroup;
  public valFav!: any;
  public loading!: boolean;


  constructor(private router: Router) {
    this.typeFav = [
      {
        name: 'favoritesHome',
      },
      {
        name: 'favorites',
      }
    ];
  }

  ngOnInit(): void {
    const val = 'favoritesHome';
    this.form = new FormGroup({
      type: new FormControl(val),
    });
    this.loading = true;
    this.getFavoMOvies(val);
    this.onChange(val);
  }


  getFavoMOvies(val: string): void {
    // tslint:disable-next-line: no-non-null-assertion
    this.movFav = JSON.parse(localStorage.getItem(val)!) || '';
  }

  onChange(event: any): any {
    this.valFav = event.target?.value || 'favoritesHome';
    this.loading = true;
    // tslint:disable-next-line: no-non-null-assertion
    setTimeout(() => {
      this.movFav = JSON.parse(localStorage.getItem(this.valFav)!) || '';
      this.loading = false;
    }, 2000);
  }

  goToDetails(peli: Result): void {
    console.log({ peli });
    this.router.navigate(['/movies/details', peli.id]);
  }

}
