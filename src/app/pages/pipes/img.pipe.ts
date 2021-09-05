import { Pipe, PipeTransform } from '@angular/core';
import { Result } from '../models/movie.interface';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {
  // https://image.tmdb.org/t/p/w500/

  transform(img: Result, poster?: any): unknown {
    const url = 'https://image.tmdb.org/t/p/w300';
    if (img.backdrop_path) {
      return url + img.backdrop_path;
    } else {
      if (img.poster_path) {
        return url + img.poster_path;
      } else {
        return 'assets/img/notfound.png';
      }
    }
  }

}
