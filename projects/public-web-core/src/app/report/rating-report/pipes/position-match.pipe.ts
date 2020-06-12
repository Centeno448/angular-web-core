import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'positionMatch' })
export class PositionMatchPipe implements PipeTransform {
  transform(value: number, mode: string): string {
    var res = '';

    switch (mode) {
      case 'icons':
        switch (value) {
          case 0:
            res = 'one';
            break;

          case 1:
            res = 'two';
            break;

          case 2:
            res = '3';
            break;

          case 3:
            res = '4';
            break;

          case 4:
            res = '5';
            break;
        }
        break;

      case 'place':
        switch (value) {
          case 0:
            res = 'first-place';
            break;

          case 1:
            res = 'second-place';
            break;

          case 2:
            res = 'third-place';
            break;

          case 3:
            res = 'fourth-place';
            break;

          case 4:
            res = 'fifth-place';
            break;
        }
        break;

      case 'card-place':
        switch (value) {
          case 0:
            res = 'card-first-place';
            break;

          case 1:
            res = 'card-second-place';
            break;

          case 2:
            res = 'card-third-place';
            break;

          case 3:
            res = 'card-fourth-place';
            break;

          case 4:
            res = 'card-fifth-place';
            break;
        }
        break;

      default:
        break;
    }
    return res;
  }
}
