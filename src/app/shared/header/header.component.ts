import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public text: FormControl = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  buscar(): void {
    if (this.text.value.trim() === '' || this.text.value.trim().length === 0) {
      return;
    }
    this.router.navigate(['/movies/search', this.text.value]);
  }

}
