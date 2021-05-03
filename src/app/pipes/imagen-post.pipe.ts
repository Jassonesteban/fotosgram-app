import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imagenPost'
})
export class ImagenPostPipe implements PipeTransform {

  transform(img: string, userId: string): string {
    return URL + '/post/imagen/' + userId + '/' + img ;
  }

}
