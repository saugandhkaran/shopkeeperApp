import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(item, matchString) {
    if (!item) {
      return [];
    } else if (!matchString) {
      return item;
    } else {
    matchString = matchString.toLowerCase();
    return item.filter( it => {
      return it.name.toLowerCase().includes(matchString);
    });
    }
  }

}
