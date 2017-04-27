import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeBrackets'
})
export class RemoveBracketsPipe implements PipeTransform {

  transform(value: string): string {
    console.log(value.substr(0, value.indexOf('[')));
    const index = value.indexOf('[');
    if (index === -1) {
      return value;
    }
    return value.substr(0, value.indexOf('['));
  }

}
