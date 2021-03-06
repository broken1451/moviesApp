import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], page: number = 0): any {
    return value.slice(page, page + 8);
  }

}
